import { bgmPauseControl, bgmPlayControl } from "./bgm";

export default async function tagVideo(sdk, uniqueUrl, tagInfoObject) {

  // 값이 '입구'인 키를 추출하여 변수에 담음
  const lobbyTagId = Object.keys(tagInfoObject).find(key => tagInfoObject[key] === '입구');
  // 값이 '작품'인 키를 추출하여 변수에 담음
  const artTagId = Object.keys(tagInfoObject).find(key => tagInfoObject[key] === '작품');

  var matterportViewer = document.querySelector('matterport-viewer').shadowRoot;
  var dockHidden = matterportViewer.querySelector('.panels.side-panel-right');


  var attachmentVideo = document.createElement('video');
  var playBtn = document.createElement('img');

  attachmentVideo.classList.add('custom-dock-video');
  playBtn.classList.add('custom-dock-play-btn');

  attachmentVideo.muted = true;// 모바일 재생때문에 넣음
  attachmentVideo.playsInline = true;// 모바일 재생때문에 넣음
  attachmentVideo.loop = true;
  playBtn.setAttribute('src', 'https://도메인/보안/images/icons_line_play_24px.svg');


  let observer;
  let observer2;
  let observer3;

  const arOverlayContainer = document.getElementById("overlay-container");




  sdk.Tag.openTags.subscribe({
    prevState: {
      hovered: null,
      docked: null,
      selected: null,
    },
    onChanged(newState) {
      const [selected = null] = newState.selected;
      if (selected !== this.prevState.selected) {

        // 선택된 태그가 '입구'인지 확인하고 이에 따라 비디오 이름 설정
        let videoName;
        if (selected === lobbyTagId) {
          videoName = 'lobby';
        } else if (selected === artTagId) {
          videoName = 'art';
        }

        if (selected) {

          // '입구' 또는 '작품' 태그가 선택되었을 경우 비디오를 삽입하는 로직
          if (selected === lobbyTagId || selected === artTagId) {

            attachmentVideo.setAttribute('src', `https://도메인/보안/${uniqueUrl}/보안/${videoName}.mp4`);

            // 1. attachmentCarousel

            // const startTime1 = performance.now(); // 시작 시간 기록
            const attachmentCarouselPromise = new Promise((resolve, reject) => {
              const check = () => {
                // 번수 재점검
                var attachmentCarousel = dockHidden.querySelector('.attachment-carousel'); // 작접 독 클릭스 null이 아니게 됨
                if (attachmentCarousel !== null) {
                  console.log('.attachment-carousel');
                  resolve(attachmentCarousel);
                } else {
                  setTimeout(check, 20); // 매 20밀리초마다 상태를 확인
                  console.log('attachmentCarousel 확인중');
                }
              };

              check();
            });
            attachmentCarouselPromise.then((attachmentCarousel) => {
              // attachmentCarousel이 존재할 때 실행할 작업
              // 이 부분에 필요한 로직을 추가하세요

              // const endTime1 = performance.now(); // 해결될 때의 시간 기록
              // const elapsedTime1 = endTime1 - startTime1; // 경과 시간 계산
              // console.log(`attachmentCarouselPromise가 해결되는 데 걸린 시간: ${elapsedTime1}ms`);


              // 2. panelOembedImage
              // const startTime2 = performance.now(); // 시작 시간 기록
              const panelOembedImagePromise = new Promise((resolve, reject) => {
                const check = () => {
                  // 번수 재점검
                  var panelOembedImage = dockHidden.querySelector('.tag-view-panel .oembed-image');
                  if (panelOembedImage !== null) {
                    console.log('panelOembedImage: ', panelOembedImage);
                    resolve(panelOembedImage);
                  } else {
                    setTimeout(check, 20); // 매 20밀리초마다 상태를 확인
                    console.log('panelOembedImage 확인중');
                  }
                };

                check();
              });
              panelOembedImagePromise.then((panelOembedImage) => {
                // panelOembedImage가 존재할 때 실행할 작업
                // 이 부분에 필요한 로직을 추가하세요

                // const endTime2 = performance.now(); // 해결될 때의 시간 기록
                // const elapsedTime2 = endTime2 - startTime2; // 경과 시간 계산
                // console.log(`panelOembedImagePromise 해결되는 데 걸린 시간: ${elapsedTime2}ms`);


                // panelOembedImage.addEventListener('mouseenter', () => {
                //   console.log("panelOembedImage mouseentered");
                // });

                panelOembedImage.prepend(attachmentVideo);
                panelOembedImage.prepend(playBtn);

                // Src Observation
                // 이미지 요소를 선택합니다.
                var lastImage = panelOembedImage.querySelector('.image');

                // 새로운 MutationObserver를 생성하고 콜백 함수를 정의합니다.
                observer = new MutationObserver(function (mutationsList, observer) {
                  // 각 변화에 대해 반복하여 확인합니다.
                  for (var mutation of mutationsList) {
                    // 속성 변화인지 확인합니다.
                    if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                      // 변화된 속성 값을 가져와서 콘솔에 출력합니다.
                      var newValue = mutation.target.getAttribute('src');
                      console.log('이미지의 src 값이 변경되었습니다:', newValue);

                      if (newValue.includes('thumbnail')) {
                        panelOembedImage.prepend(attachmentVideo);
                        panelOembedImage.prepend(playBtn);
                      } else {
                        playBtn?.remove();
                        attachmentVideo?.remove();
                      }
                    }
                  }
                });

                // MutationObserver를 설정하여 관찰할 대상을 지정합니다.
                observer.observe(lastImage, { attributes: true });

                // 나중에 관찰을 중지하려면 다음을 호출합니다:
                // observer.disconnect();


                // 대상 요소를 선택합니다.
                const overlayElement = matterportViewer.querySelector('.attachment-overlay');
                console.log("overlayElement: ", overlayElement);

                // MutationObserver 인스턴스를 생성합니다.
                observer2 = new MutationObserver((mutationsList, observer) => {
                  // 변화가 감지되었을 때 실행될 콜백 함수
                  for (const mutation of mutationsList) {
                    // class 속성에 대한 변화를 확인합니다.
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                      const isOpen = overlayElement.classList.contains('open');
                      if (isOpen) {
                        console.log('overlay가 열렸습니다.');
                        arOverlayContainer.style.zIndex = "";

                      } else {
                        console.log('overlay가 닫혔습니다.');
                        arOverlayContainer.style.zIndex = "200";
                        if (lastImage.src.includes('thumbnail')) {
                          attachmentVideo.pause();
                          panelOembedImage.prepend(attachmentVideo);
                        }
                        bgmPlayControl();
                      }
                    }
                  }
                });

                // 감시할 대상과 옵션을 지정하여 감시를 시작합니다.
                observer2.observe(overlayElement, { attributes: true });



                // 미디어 큰 화면 시작
                panelOembedImage.addEventListener('click', () => {
                  // 3. overlayOembedImage
                  // const startTime3 = performance.now(); // 시작 시간 기록
                  const overlayOembedImagePromise = new Promise((resolve, reject) => {
                    const check = () => {
                      // 번수 재점검
                      var overlayOembedImage = matterportViewer.querySelector('.attachment-overlay .oembed-image');
                      if (overlayOembedImage !== null) {
                        console.log('overlayOembedImage: ', overlayOembedImage);
                        resolve(overlayOembedImage);
                      } else {
                        setTimeout(check, 20); // 매 20밀리초마다 상태를 확인
                        console.log('overlayOembedImage 확인중');
                      }
                    };

                    check();
                  });
                  overlayOembedImagePromise.then((overlayOembedImage) => {
                    // overlayOembedImage가 존재할 때 실행할 작업
                    // 이 부분에 필요한 로직을 추가하세요

                    // const endTime3 = performance.now(); // 해결될 때의 시간 기록
                    // const elapsedTime3 = endTime3 - startTime3; // 경과 시간 계산
                    // console.log(`overlayOembedImagePromise 해결되는 데 걸린 시간: ${elapsedTime3}ms`);

                    // overlayOembedImage.addEventListener('mouseenter', () => {
                    //   console.log("overlayOembedImage mouseentered");
                    // });

                    // 4. overlayImg
                    // const startTime4 = performance.now(); // 시작 시간 기록
                    const overlayImgPromise = new Promise((resolve, reject) => {
                      const check = () => {
                        // 번수 재점검
                        var overlayImg = matterportViewer.querySelector('.attachment-overlay .image');
                        if (overlayImg !== null) {
                          console.log('overlayImg: ', overlayImg);
                          resolve(overlayImg);
                        } else {
                          setTimeout(check, 20); // 매 20밀리초마다 상태를 확인
                          console.log('overlayImg 확인중');
                        }
                      };

                      check();
                    });

                    overlayImgPromise.then((overlayImg) => {
                      // overlayImg가 존재할 때 실행할 작업
                      // 이 부분에 필요한 로직을 추가하세요

                      // const endTime4 = performance.now(); // 해결될 때의 시간 기록
                      // const elapsedTime4 = endTime4 - startTime4; // 경과 시간 계산
                      // console.log(`overlayImgPromise 해결되는 데 걸린 시간: ${elapsedTime4}ms`);

                      if (overlayImg.src.includes('thumbnail')) {
                        overlayOembedImage.prepend(attachmentVideo);
                        attachmentVideo.play();
                        attachmentVideo.muted = false;
                        attachmentVideo.classList.add('attachment-view');
                        attachmentVideo.style.filter = 'brightness(1.0)';
                        bgmPauseControl();
                        attachmentVideo.loop = true;
                      }

                      // 새로운 MutationObserver를 생성하고 콜백 함수를 정의합니다.
                      observer3 = new MutationObserver(function (mutationsList, observer) {
                        // 각 변화에 대해 반복하여 확인합니다.
                        for (var mutation of mutationsList) {
                          // 속성 변화인지 확인합니다.
                          if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                            // 변화된 속성 값을 가져와서 콘솔에 출력합니다.
                            var newValue = mutation.target.getAttribute('src');
                            console.log('이미지의 src 값이 변경되었습니다:', newValue);

                            if (newValue.includes('thumbnail')) {
                              overlayOembedImage.prepend(attachmentVideo);
                              attachmentVideo.play();
                              attachmentVideo.muted = false;
                              attachmentVideo.classList.add('attachment-view');
                              attachmentVideo.style.filter = 'brightness(1.0)';
                              bgmPauseControl();
                              attachmentVideo.loop = true;
                            } else {
                              attachmentVideo?.remove();
                              bgmPlayControl();

                            }
                          }
                        }
                      });

                      // MutationObserver를 설정하여 관찰할 대상을 지정합니다.
                      observer3.observe(overlayImg, { attributes: true });

                      // 나중에 관찰을 중지하려면 다음을 호출합니다:
                      // observer.disconnect();











                    }); // overlayImagePromise.then()
                  }); // overlayOembedImagePromise.then()
                }); // panelOembedImage.addEventListener('click') callbak


              }); // panelOembedImagePromise.then() callback
            }); // attachmentCarouselPromise.then() callback
          }
          else {
            dockHidden.querySelector('.custom-dock-video')?.remove(); //태그가 닫혔을때 영상 제거
            console.log('독을 연 채로 "입구", "작품"이 아닌 다른 독 오픈');
          } // if (selected === lobbyTagId || selected === artTagId) else

        } else {
          dockHidden.querySelector('.custom-dock-video')?.remove(); //태그가 닫혔을때 영상 제거
          console.log("독 닫기 버튼");
          // observer.disconnect();
          // observer2.disconnect();
          // observer3.disconnect();
        } // if (selected) else
      } // if (selected !== this.prevState.selected)
      // clone and store the new state
      this.prevState = {
        ...newState,
        selected,
      }; // clone and store the new state
    }, // onChanged
  }); // sdk.Tag.openTags.subscribe
} // tagVideo