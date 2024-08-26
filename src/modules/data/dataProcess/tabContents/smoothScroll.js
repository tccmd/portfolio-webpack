export default function smoothScroll(element) {
    element.isScrolling = true;
    var scrollableWidth = element.scrollWidth - element.clientWidth;
    var step = 1; // 스크롤 간격 (조절 가능)

    function scroll() {
        if (element.isScrolling) {
            if (element.scrollLeft < scrollableWidth) {
                element.scrollLeft += step;
            } else {
                // 스크롤이 끝에 도달하면 다시 처음으로 되돌아가지 않고, 
                // 기존 요소에 새로운 텍스트를 추가합니다.
                // 엘리먼트의 자식 요소를 복제합니다.
                var children = element.children;
                var clonedChildren = [];
                for (var i = 0; i < children.length; i++) {
                    var child = children[i].cloneNode(true); // true는 깊은 복사를 의미합니다.
                    clonedChildren.push(child);
                }

                // 복제한 자식 요소를 원래 요소에 추가합니다.
                for (var j = 0; j < clonedChildren.length; j++) {
                    element.appendChild(clonedChildren[j]);
                }
                
                // 스크롤 가능한 너비를 다시 계산합니다.
                scrollableWidth = element.scrollWidth - element.clientWidth;

            }
            requestAnimationFrame(scroll);
        }
    }

    scroll();
}