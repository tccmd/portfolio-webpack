import bgmAutoPlay from '../etc/bgm.js';
import bottomSheet from './bottomSheet.js';
import collapse from './collapse.js';
import CreateItemButtons from './createItemButtons.js';
import footer from './footer.js';

export default function uiLoad(sdk, modelNameKo, modelNameEn, hotelNameEn, modelUniqueUrl) {
  // 메타포트 뷰어 로드된 후 UI를 로드
  if (sdk !== null) {
    // 1. 오버레이 컨테이너
    const overlayContainer = document.getElementById("overlay-container");
    overlayContainer.classList.remove("hidden");
    document.getElementById("model-name").textContent = modelNameEn + "\n - " + hotelNameEn;
    // 2. 푸터에 섀도우 루트로 올라운더 링크 추가
    footer();
    // 3. 오른쪽 상단 UI - 콜랩스
    collapse(modelNameEn, hotelNameEn);
    // 4. 하단 UI - 바텀시트
    bottomSheet();
    // 5. 바텀시트 버튼에 이벤트 적용
    CreateItemButtons(sdk, modelNameKo);
    // 6. 맨 뒤에 클릭시켜 작동하는 듯한 느낌으로 
    document.getElementById('authorInfoBtn').click();
    const authorInfoBtn = document.getElementById('authorInfoBtn');
    authorInfoBtn.addEventListener('click', () => {
      // gtag 이벤트 생성
      gtag('event', 'click', {
        'button_name': modelNameKo + " " + "author info"
      });
    });
    // // 7. 오디오 플레이
    bgmAutoPlay(modelUniqueUrl);
  }
}