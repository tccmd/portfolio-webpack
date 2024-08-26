// 엘리먼트
const handle = document.getElementById('handle');
const bottomsheetContainer = document.getElementById('bottomsheetContainer');
const bottomSheetBox = document.getElementById('bottom-sheet-box');
const bottomSheetUL = document.getElementById('bottomSheetUL');
const links = bottomSheetUL.querySelectorAll('li');
// 바텀시트 높이
const closedHeight = '52px'; // '1.75rem'; // 
const openedHeight = '120px';// '6.8rem'; // 
// 타임아웃
let timeoutId;
// 의도적인 토글 제어
var isIntentionalToggle = false;


export default function bottomSheet() {

  // console.log("바텀시트");

  iconAnimation();

  // 초기 높이 설정
  bottomsheetContainer.style.height = openedHeight;

  // 바텀시트 토글 (모바일, pc - 핸들 클릭)
  handle.addEventListener('click', () => toggleBottomSheet('click'));

  // 이 코드에서는 요소 안의 마우스 이벤트가 발생할 때마다 타이머가 재설정되며, 마우스가 요소 위에 있을 때는 타이머가 해제됩니다. 마우스가 요소 밖으로 나가면 다시 타이머가 설정되어 일정 시간이 지난 후에 resetBottomSheetHeight() 함수가 호출됩니다.
}

function iconAnimation() {

  links.forEach((link, index) => {
    setTimeout(() => {
      link.style.animation = 'elastic .5s ease-out forwards 0s'; // 애니메이션 적용
    }, index * 50);
  });
  
  // 모든 링크에 대한 애니메이션 종료 이벤트 핸들러 추가
  links.forEach((link, index) => {
    link.addEventListener('animationend', () => {
      link.style.animation = ''; // 애니메이션을 초기화하여 중지
    });
  });

}

export function toggleBottomSheet(event) {

  // console.log("바텀시트 토글");

  if (bottomsheetContainer.style.height === openedHeight) {
    bottomsheetContainer.style.height = closedHeight;
    if (event === "click") {
      isIntentionalToggle = true;
    }
  } else {
    bottomsheetContainer.style.height = openedHeight;
    if (event === "click") {
      isIntentionalToggle = false;
      iconAnimation();
    }
  }

}

// 의도적으로 닫지 않았을 때 바텀시트 여는 함수
export function openBottomSheetHeight() {
  if (!isIntentionalToggle) {
    bottomsheetContainer.style.height = openedHeight;
  }
}

// 바텀시트 닫는 함수
export function closeBottomSheetHeight() {
  bottomsheetContainer.style.height = closedHeight;
}