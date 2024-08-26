import smoothScroll from "./smoothScroll";
import generateIconUrl from "./generateIconUrl";

export default function CreateAboutContent(modelNameKo) {

    // 어바웃 컨텐트 시작
    const aboutData = [
        {
            label: "",
            labelLong: "",
            icon: "https://도메인/보안/images/logo_allrounder.svg",
            url: ""
        },
        {
            label: "홈페이지",
            labelLong: "홈페이지 :: Homepage", 
            icon: generateIconUrl("icons_line_home_24px"),
            url: "https://home.도메인/",
            dataButtonName: "about-btn-click-home"
        },
        {
            label: "촬영문의",
            labelLong: "촬영문의 :: Filming inquiry",
            icon: generateIconUrl("icons_fill_receipt_24px"),
            url: "https://home.도메인/contact",
            dataButtonName: "about-btn-click-filming_qna"
        },
    ];

    // const labelEn = {
    //     "홈페이지": " :: Homepage",
    //     "촬영문의": " :: Filming inquiry",
    // }

    // console.log(aboutData)

    const tabContent = document.querySelectorAll('.tab-content')[2];

    aboutData.forEach(data => {
        const button = document.createElement("button");
        const span = document.createElement("span");
        const icon = document.createElement("img");
        const label = document.createElement("span");
        // const labelEnText = labelEn[data.label]; // 라벨의 영어 텍스트를 가져옵니다.

        icon.src = data.icon;
        icon.alt = "Icon";

        label.textContent = data.labelLong;
        label.classList.add("ml-2");
        label.classList.add("mr-20");

        // 영어 텍스트에 클래스 추가
        // const labelEnSpan = document.createElement("span");
        // labelEnSpan.textContent = `${labelEnText}`;
        // labelEnSpan.classList.add("label-en");

        button.classList.add("btn");
        button.classList.add("w-full");
        button.classList.add("justify-start");
        span.classList.add("flex");
        span.classList.add("items-center");
        span.classList.add("overflow-x-auto");
        span.classList.add("whitespace-nowrap");

        if (data.label === "홈페이지" || data.label === "촬영문의") {
            button.classList.add("btn-neutral");
            button.classList.add("my-0.5");

            span.addEventListener("mouseenter", () => {
                smoothScroll(span);
            });

            span.addEventListener("mouseleave", () => {
                span.isScrolling = false;
                span.scrollLeft = 0;
            });

        } else {
            button.classList.add("btn-ghost");
            // icon.classList.add("custom-icon");
        }

        if (data.url !== "") {
            button.addEventListener("click", () => {
                // gtag 이벤트 생성
                gtag('event', modelNameKo + " " + "올라운더" + data.label);

                window.open(data.url, "_blank");
            });
        } else {
            button.classList.add("custom-disabled");
        }

        span.appendChild(icon);
        span.appendChild(label);
        // span.appendChild(labelEnSpan); // 영어 텍스트 추가
        button.appendChild(span);

        tabContent.appendChild(button);
    });
}