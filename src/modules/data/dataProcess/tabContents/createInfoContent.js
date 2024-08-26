import smoothScroll from "./smoothScroll";
import generateIconUrl from "./generateIconUrl";


const reservation = "아트스테이 예약 :: Art Stay Reservation";

const qna = "호스트에게 문의하기 :: Contact the host";
const qnaUrl = "https://open.kakao.com/o/s6qJWBwf";

const instagramId = "divein_artstay";
const instagramUrl = `https://www.instagram.com/${instagramId}`;



export default function CreateInfoContent(modelNameKo, modelAddressKo, modelAddressEn, modelAddressUrl, modelReservationUrl) {

    // 주소
    const address = modelAddressKo + modelAddressEn;
    // 에어비엔비 예약 주소
    const reservationUrl = modelReservationUrl;

    // 인포 컨텐트 시작
    const InfoData = [
        {
            label: "",
            icon: "https://도메인/보안/common/divein-logo.png",
            url: "",
        },
        {
            label: address,
            icon: generateIconUrl("icons_line_address_24px"),
            url: modelAddressUrl,
        },
        {
            label: reservation,
            icon: generateIconUrl("icons_line_home_24px"),
            url: reservationUrl,
        },
        {
            label: qna,
            icon: generateIconUrl("icons_fill_receipt_24px"),
            url: qnaUrl,
        },
        {
            label: "@" + instagramId,
            icon: generateIconUrl("icons_line_instagram_24px"),
            url: instagramUrl,
        },
    ];

    const tabContent = document.querySelectorAll('.tab-content')[0];

    InfoData.forEach(data => {
        const button = document.createElement("button");
        const span = document.createElement("span");
        const icon = document.createElement("img");
        const label = document.createElement("span");

        icon.src = data.icon;
        icon.alt = "Icon";

        label.textContent = data.label;
        label.classList.add("mx-2");

        button.classList.add("btn");
        button.classList.add("w-full");
        button.classList.add("justify-start");
        span.classList.add("flex");
        span.classList.add("items-center");
        span.classList.add("overflow-x-auto");
        span.classList.add("whitespace-nowrap");

        if (data.label === reservation || data.label === qna || data.label === "@" + instagramId) {
            button.classList.add("btn-neutral");
            button.classList.add("my-0.5");
        } else {
            button.classList.add("btn-ghost");
        }

        // if (data.label === "" || data.label === address) {
        //     icon.classList.add("custom-icon");
        // }

        if (data.url !== "") {
            button.addEventListener("click", () => {
                // gtag 이벤트 생성
                gtag('event', modelNameKo + " " + data.label);

                window.open(data.url, "_blank");
            });
        } else {
            button.classList.add("custom-disabled");
        }

        if (data.label === address || data.label === reservation || data.label === qna) {
            span.addEventListener("mouseenter", () => {
                smoothScroll(span);
            });

            span.addEventListener("mouseleave", () => {
                span.isScrolling = false;
                span.scrollLeft = 0;
            });
        }

        span.appendChild(icon);
        span.appendChild(label);
        button.appendChild(span);

        tabContent.appendChild(button);
    });
}