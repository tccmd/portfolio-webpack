import '@matterport/webcomponent';
import tagCallBack from './modules/etc/tagCallbak.js';
import tagVideo from './modules/etc/tagVideo.js';
import dock from './modules/etc/dock.js';
import filter from './modules/etc/filter.js'
import icon from './modules/etc/icon.js';
import tags from './modules/etc/tags.js';
import first from './modules/data/dataProcess/first.js';
import uiLoad from './modules/ui/uiLoad.js';
import sweepMetaData from './modules/etc/sweepMetaData.js';
import subscribes from './modules/etc/subscribes.js';
import shadowRoot from './modules/etc/shoadowRoot.js';

// 전역 변수 선언
let sdk;

// main 함수
const main = () => {
  // 메타포트 SDK 초기화
  document.querySelector('matterport-viewer').playingPromise
    .then(async (resolvedSdk) => {
      sdk = resolvedSdk;

      // console.log("index.js-ipAddress: ", ipAddress);
      // console.log("index.js-data", data);

      // 1. 
      // callback Promise 처리
      tagCallBack(sdk)
        .then(async tagObject => {
          // console.log("Received tagInfoObject:", tagInfoObject);

          // 1-1. 태그와 연결된 비디오 (최대한 먼저해야 잘 나옴)
          tagVideo(sdk, data.modelUniqueUrl, tagObject);
          // 1-2. 태그 직접 클릭시 독
          dock(sdk, data.modelNameKo, tagObject);

          // 2. 필터
          if(data.modelId !== "uRJ5LvRBVUy" || data.modelId !== "WeMZXCQv42n") {
            filter(sdk, data.modelNumber);
          }
          // 3. 바로 보이는 태그 
          // 3-1. 독 디자인과 독 안의 아이콘
          icon(sdk);
          // 3-2. 공간에서 보이는 태그
          tags(sdk);

          // 4. 데이터 적용
          first(data, sdk, tagObject);
          // 5. ui 로드
          uiLoad(sdk, data.modelNameKo, data.modelNameEn, data.hotelNameEn, data.modelUniqueUrl);
          // 6. 스윕 데이터
          await sweepMetaData(sdk, data.modelNameKo);
        })
        .catch(error => {
          console.error("Error occurred:", error);
        });

      // 구독에 관련된 모듈
      await subscribes(sdk);

      // 섀도우 루트 독 디자인
      shadowRoot(sdk);

    })
    .catch(error => console.error(error));
}

// main 함수 실행
main();