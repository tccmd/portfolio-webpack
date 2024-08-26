import { bgmPauseClick, bgmPlayClick, track } from "../etc/bgm";

const itemtour = document.getElementById("itemTour");
const itemDollHouse = document.getElementById("itemDollHouse");
const itemFloorPlan = document.getElementById("itemFloorPlan");
const itemShare = document.getElementById("itemShare");
const itemBgm = document.getElementById("itemBgm");

const itemTourIcon = document.getElementById("itemTourIcon");
const itemDollHouseIcon = document.getElementById("itemDollHouseIcon");
const itemFloorPlanIcon = document.getElementById("itemFloorPlanIcon");
const itemBgmIcon = document.getElementById("itemBgmIcon");

export default async function CreateItemButtons(sdk, modelNameKo) {

    // 1 - 투어 감지
    // 1. 가이드 투어
    const tourIndex = 0;
    // var snapshotsArray = [];
    // sdk.Tour.getData()
    //     .then(function (snapshots) {
    //         // Tour getData complete.
    //         if (snapshots.length > 0) {
    //             console.log('snapshots: ' + snapshots);
    //             // console.log('First snapshot sid: ' + snapshots[0].sid);
    //             // console.log('First snapshot name: ' + snapshots[0].name);
    //             // console.log('First snapshot position: ' + snapshots[0].position);
    //             setTimeout(() => {
    //                 snapshotsArray = snapshots;
    //                 console.log('snapshotsArray: ' + snapshotsArray);
    //                 console.log('snapshotsArray[0]: ', snapshotsArray[0]);
    //                 console.log('snapshotsArray[1]: ', snapshotsArray[1]);
    //                 console.log('snapshotsArray[2]: ', snapshotsArray[2]);
    //                 console.log('snapshotsArray[3]: ', snapshotsArray[3]);
    //             }, 5000);
    //         }
    //     })
    //     .catch(function (error) {
    //         // Tour getData error.
    //     });
    // sdk.Tour.currentStep.subscribe(function (current) {
    //     // the step index has changed
    //     // 0 for the first step, 1 for the second, etc.
    //     console.log('Current step is ', current.step);
    //     console.log('Current is ', current);

    // });
    // sdk.Tour.state.subscribe(function (state) {
    //     // the state has changed
    //     // console.log('Current state is ', state.current);
    //     // console.log('State is ', state);

    //     if (state.current === 'tour.inactive') {
    //         // console.log("state: ", state);
    //         itemTourIcon.classList.remove('swap-active');
    //         openCollapse();
    //         openBottomSheetHeight();
    //     } else {
    //         closeCollapse();
    //         closeBottomSheetHeight();
    //     }

    // });
    itemtour.addEventListener('click', function () {
        // swap-off && 투어 중지
        if (itemTourIcon.classList.contains('swap-active')) {
            itemTourIcon.classList.remove('swap-active');
            // sdk.Tour.stop()
            //     .then(function () {
            //         // Tour stop complete.
            //     })
            //     .catch(function (error) {
            //         // Tour stop error.
            //     });
        } else {
            // swap-on && 투어 스타트
            itemTourIcon.classList.add('swap-active');
            sdk.Tour.start(tourIndex)
                .then(function () {
                    // Tour start complete.
                })
                .catch(function (error) {
                    // Tour start error.
                });

            // gtag 이벤트 생성
            gtag('event', modelNameKo + " " + "가이드 투어");
        }
    });

    // sdk.Tour.transition.subscribe(function (transition) {
    //     // the transition has changed
    //     console.log('Current transition is ', transition.from, transition.to);
    // });

    // 2~3 - 모드 감지
    sdk.Mode.current.subscribe(function (mode) {
        // 2. 돌하우스
        itemDollHouse.addEventListener('click', function () {
            if (itemDollHouseIcon.classList.contains('swap-active') && mode === 'mode.dollhouse') {
                itemDollHouseIcon.classList.remove('swap-active');
                sdk.Mode.moveTo('mode.inside')
                    .then(function (nextMode) {
                        // Move successful.
                        // console.log('Arrived at new view mode ' + nextMode);
                    })
                    .catch(function (error) {
                        // Error with moveTo command
                    });
            } else {
                itemFloorPlanIcon.classList.remove('swap-active');
                itemDollHouseIcon.classList.add('swap-active');
                sdk.Mode.moveTo('mode.dollhouse')
                    .then(function (nextMode) {
                        // Move successful.
                        // console.log('Arrived at new view mode ' + nextMode);
                    })
                    .catch(function (error) {
                        // Error with moveTo command
                    });

                // gtag 이벤트 생성
                gtag('event', modelNameKo + " " + "돌하우스 모드");
            }
        });

        // 3. 평면도
        itemFloorPlan.addEventListener('click', function () {
            if (itemFloorPlanIcon.classList.contains('swap-active') && mode === 'mode.floorplan') {
                itemDollHouseIcon.classList.remove('swap-active');
                sdk.Mode.moveTo('mode.inside')
                    .then(function (nextMode) {
                        // Move successful.
                        console.log('Arrived at new view mode ' + nextMode);
                    })
                    .catch(function (error) {
                        // Error with moveTo command
                    });
            } else {
                itemDollHouseIcon.classList.remove('swap-active');
                itemFloorPlanIcon.classList.add('swap-active');
                sdk.Mode.moveTo('mode.floorplan')
                    .then(function (nextMode) {
                        // Move successful.
                        console.log('Arrived at new view mode ' + nextMode);
                    })
                    .catch(function (error) {
                        // Error with moveTo command
                    });
            }
            // gtag 이벤트 생성
            gtag('event', modelNameKo + " " + "평면도 모드");
        });
        // the view mode has changed
        // console.log('Current view mode is is ', mode);

        if (mode === 'mode.inside') {
            itemFloorPlanIcon.classList.remove('swap-active');
            itemDollHouseIcon.classList.remove('swap-active');
        }
    });


    var url = await sdk.Link.createLink();

    // 4. Share
    itemShare.addEventListener('click', async function () {
        // 다이얼로그 요소 표시
        if (navigator.share) {
            navigator.share({
                title: '다이브인 DIVEIN',
                url: url
            }).then(() => {
                console.log('Thanks for sharing!');

                // gtag 이벤트 생성
                gtag('event', modelNameKo + " " + "공유 완료");

            })
                .catch(console.error);
        } else {
            // await sdk.Link.setShareLinkPolicy(sdk.Link.CreationPolicy.REFERRER);
            // url = await sdk.Link.createLink();
            // 클립보드에 url 복사
            copyTextToClipboard(url);
            // data-tip 속성 값을 변경합니다.
            itemShare.setAttribute('data-tip', '클립보드에 복사되었습니다!');
            setTimeout(() => {
                itemShare.setAttribute('data-tip', '공유하기');
            }, 2500);
            // gtag 이벤트 생성
            gtag('event', modelNameKo + " " + "브라우저에서 공유 기능 지원 안함");
            console.log("브라우저에서 공유 기능 지원 안함");

            await sdk.Link.setShareLinkPolicy(sdk.Link.CreationPolicy.REFERRER);
            console.log(await sdk.Link.createLink());
            await sdk.Link.setShareLinkPolicy(sdk.Link.CreationPolicy.WINDOW);
            console.log(await sdk.Link.createLink());
        }
    });

    // 6. BGM
    itemBgm.addEventListener('click', function () {
        if (itemBgmIcon.classList.contains('swap-active') && !track.paused) {
            itemBgmIcon.classList.remove('swap-active');
            bgmPauseClick();

            // gtag 이벤트 생성
            gtag('event', modelNameKo + " " + "오디오 중지");

        } else {
            itemBgmIcon.classList.add('swap-active');
            bgmPlayClick();

            // gtag 이벤트 생성
            gtag('event', modelNameKo + " " + "오디오 재생");
        }
    });
    // 오디오 요소에 재생 및 일시 중지 이벤트 리스너 추가
    track.addEventListener('play', function () {
        itemBgmIcon.classList.add('swap-active');
    });

    track.addEventListener('pause', function () {
        itemBgmIcon.classList.remove('swap-active');
    });

    track.addEventListener('volumechange', function () {
        // console.log("track.volume: ", track.volume);
        if (track.muted || track.volume === 0) {
            // 오디오가 뮤트되었을 때 수행할 작업
            itemBgmIcon.classList.remove('swap-active');
            // console.log('오디오가 뮤트되었습니다.');
        } else {
            // 오디오가 언뮤트되었을 때 수행할 작업
            itemBgmIcon.classList.add('swap-active');
            // console.log('오디오가 언뮤트되었습니다.');
        }
    });

}

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // // 추가된 요소를 화면에 보이지 않게 함
    // textArea.style.position = "fixed";
    // textArea.style.top = 0;
    // textArea.style.left = 0;
    // textArea.style.width = "2em";
    // textArea.style.height = "2em";
    // textArea.style.padding = 0;
    // textArea.style.border = "none";
    // textArea.style.outline = "none";
    // textArea.style.boxShadow = "none";
    // textArea.style.background = "transparent";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? '복사되었습니다.' : '복사 실패';
        console.log(msg);
    } catch (err) {
        console.error('클립보드에 텍스트를 복사하는 중 오류가 발생했습니다:', err);
    }

    document.body.removeChild(textArea);
}