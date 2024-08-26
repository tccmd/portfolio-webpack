import { closeBottomSheetHeight, openBottomSheetHeight } from "../ui/bottomSheet";
import { closeCollapse, openCollapse } from "../ui/collapse";
import footer from "../ui/footer";
// import shadowRoot from "./shoadowRoot";
// const overlayContainer = document.getElementById("overlay-container");

// const tagInfoArray = [];

// 태그 정보 구독 (이거 없으니까 태그 직접 클릭 시 독 안 열림)
export default async function dock(sdk, modelNameKo, tagInfoObject) {

  sdk.Tag.openTags.subscribe({
    prevState: {
      hovered: null,
      docked: null,
      selected: null,
    },
    onChanged(newState) {
      if (newState.docked !== this.prevState.docked) {
        if (newState.docked) {
          // 독 열렸을 때
          // 구글 애널리틱스 태그 버튼 횟수 증가
          const dockedTag = tagInfoObject[newState.docked];
          // gtag 이벤트 생성
          gtag('event', modelNameKo + " " + dockedTag);
          // 바텀시트 닫기
          closeBottomSheetHeight();
          // 콜랩스 닫기
          closeCollapse();

          // overlayContainer.style.zIndex = "200"; // 독이 열렸을 때 z-index를 200으로 설정

        } else {
          // 독 닫혔을 때
          // console.log(this.prevState.docked, 'was undocked');
          setTimeout(() => {
            // 푸터 ui 재생성
            footer();
            // 바텀시트 열기
            openBottomSheetHeight();
            // 콜랩스 다시 열기
            openCollapse();

            // overlayContainer.style.zIndex = ""; // 독이 닫혔을 때 z-index를 제거

          }, 200);
        }
      }
      const [selected = null] = newState.selected; // destructure and coerce the first Set element to null 구조를 해체하고 첫 번째 Set 요소를 null로 강제합니다.
      if (selected !== this.prevState.selected) {
        if (selected) {
          // console.log(selected, 'was docked');
          sdk.Tag.dock(selected);
          sdk.Mattertag.navigateToTag(selected, sdk.Mattertag.Transition.FADEOUT);
        }
      }

      // clone and store the new state
      this.prevState = {
        ...newState,
        selected,
      };
    },
  });
}