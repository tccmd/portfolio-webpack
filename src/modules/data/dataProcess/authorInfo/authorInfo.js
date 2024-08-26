// 모달 요소 가져오기
const modal = document.getElementById('my_modal_3');

export default function authorInfo(koDesc, enDesc, hotelNameKo, hotelNameEn, modelAirBnbPictureSrc, modelUniqueUrl) {
    // 이미지, 제목, 설명 설정
    // modal.querySelector('img').src = modelAirBnbPictureSrc;
    // if () {
    //     `https://도메인/보안/${modelUniqueUrl}/보안/title.jpg`;
    // }
    modal.querySelector('img').src = modelAirBnbPictureSrc !== "" ? modelAirBnbPictureSrc : `https://도메인/보안/${modelUniqueUrl}/보안/title.jpg`;
    console.log("authorInfo.js, ", modelAirBnbPictureSrc, modal.querySelector('img').src);
    document.getElementById("model-desc-ko").textContent = koDesc;
    document.getElementById("model-desc-en").textContent = enDesc;
    document.getElementById("hotel-name-ko").textContent = hotelNameKo;
    document.getElementById("hotel-name-en").textContent = hotelNameEn;
}