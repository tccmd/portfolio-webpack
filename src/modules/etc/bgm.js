// 엘리먼트
// 오디오 요소
export var track = document.getElementById('audio-track');

// 변수
// 의도적인 토글 제어
var isIntentionalToggle = false;

// 오디오의 현재 볼륨
let currentVolume = 0.1;
// 볼륨 조절 간격 (밀리초)
const volumeChangeInterval = 10;
// 목표 볼륨
const targetVolume = 0.5;
// 볼륨 조절 단계
const volumeStep = 0.05;

// 오디오를 부드럽게 재생하는 함수
function fadeIn() {
    if (currentVolume < targetVolume) {
        currentVolume += volumeStep;
        if (currentVolume > targetVolume) {
            currentVolume = targetVolume;
        }
        track.volume = currentVolume;
        setTimeout(fadeIn, volumeChangeInterval);
    }
}

// 오디오를 부드럽게 일시 중지하는 함수
function fadeOut() {
    if (currentVolume > 0) {
        currentVolume -= volumeStep;
        if (currentVolume < 0) {
            currentVolume = 0;
        }
        track.volume = currentVolume;
        setTimeout(fadeOut, volumeChangeInterval);
    } else {
        // track.pause();
    }
}

export default function bgmAutoPlay(modelUniqueUrl) {

    // 오디오 파일의 URL
    var audioUrl = `https://도메인/보안/${modelUniqueUrl}/보안/bgm.wav`;

    // src 할당
    track.src = audioUrl;
    track.loop = true;
    track.volume = currentVolume;

    var autoplayVideoInterval = setInterval(autoplayVideo, 20);

    function autoplayVideo() {
        var promise = track.play();
        console.log("bgm 재생 시도 중");
        if (promise !== undefined) {
            promise.then(function (_) {
                // Autoplay started!
                clearInterval(autoplayVideoInterval);
                console.log("재생됨");
                fadeIn(); 
            }).catch(function (error) {// Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }
    };

}

export function bgmPlayClick() {
    // track.play();
    // 오디오를 부드럽게 재생
    fadeIn();
    isIntentionalToggle = false;
    console.log("의도적으로 bgm 플레이");
}

export function bgmPauseClick() {
    // track.pause();
    // 오디오를 부드럽게 일시 중지
    fadeOut();
    isIntentionalToggle = true;
    console.log("의도적으로 bgm 멈춤");
}

export function bgmPlayControl() {
    if (isIntentionalToggle) {
        console.log("의도적으로 bgm 멈춘 상태에서는 다시 재생 안함");
    } else {
        // 오디오를 부드럽게 재생
        fadeIn();
        console.log("의도적으로 재생중이었다면 비디오가 끝나면 다시 재생");
    }
}

export function bgmPauseControl() {
    // 오디오를 부드럽게 일시 중지
    fadeOut();
    console.log("비디오 재생 시 bgm 멈춤");
}