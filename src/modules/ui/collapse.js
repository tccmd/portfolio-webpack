var myCollapse = document.getElementById("myCollapse");
var modelName = document.getElementById("model-name");
var isIntentionalToggle = false;
let longTitle;
let shortTitle;

export default function collapse(modelNameEn, hotelNameEn) {
    longTitle = modelNameEn + "\n - " + hotelNameEn;
    shortTitle = modelNameEn;

    modelName.addEventListener("click", function () {
        myCollapse.classList.toggle("collapse-open");
        if (myCollapse.classList.contains("collapse-open")) {
            modelName.textContent = longTitle;
            isIntentionalToggle = false;
        } else {
            modelName.textContent = shortTitle;
            isIntentionalToggle = true;
        }
    });

    // 마우스가 요소 위에 올라갔을 때 발생하는 이벤트 리스너를 추가합니다.
    myCollapse.addEventListener("mouseenter", function () {
        // 클래스를 추가합니다.
        this.classList.add("collapse-open");
        modelName.textContent = longTitle;
        // this.classList.remove("size-8");
        // modelName.textContent = modelName.textContent.replace("+", "");
    });
    myCollapse.addEventListener("mouseleave", function () {
        // 클래스를 추가합니다.
        this.classList.remove("collapse-open");
        modelName.textContent = shortTitle;
        // this.classList.add("size-8");
        // modelName.textContent = "+" + modelName.textContent;
    });
}

export function closeCollapse() {
    myCollapse.classList.remove("collapse-open");
    modelName.textContent = shortTitle;
}

export function openCollapse() {
    if (!isIntentionalToggle) {
        myCollapse.classList.add("collapse-open");
        modelName.textContent = longTitle;
    }
}