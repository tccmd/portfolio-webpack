export default function footer() {

  // console.log("푸터");

    // id가 "footer"인 요소를 찾습니다.
    var matterportViewer = document.querySelector('matterport-viewer').shadowRoot;
    var reactRenderRoot = matterportViewer.getElementById("react-render-root");
    reactRenderRoot.style.zIndex = 100;
    var footerElement = matterportViewer.getElementById("footer");
    // footerElement.style.zIndex = 100; - 왜 안돼

    // console.log("푸터 요소: ", footerElement);
    if (!footerElement) return; // footer 요소가 없으면 함수를 종료합니다.

    if (!footerElement.querySelector('#allrounder-link')) {
      // 새로운 a 요소를 생성합니다.
    var newAnchorElement = document.createElement("a");
  
    // href 속성을 설정합니다.
    newAnchorElement.href = "https://home.도메인/";
  
    // target 속성을 설정합니다.
    newAnchorElement.target = "_blank";
  
    // 텍스트 내용을 설정합니다.
    newAnchorElement.textContent = "All Rounder";

    newAnchorElement.classList.add("link");

    // id 속성을 설정합니다.
    newAnchorElement.setAttribute("id", "allrounder-link");
  
    // footer 요소에 새로운 a 요소를 추가합니다.
    footerElement.insertBefore(newAnchorElement, footerElement.firstChild);
    }
  }