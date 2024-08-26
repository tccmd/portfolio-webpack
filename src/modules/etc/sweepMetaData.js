export default async function sweepMetaData(sdk, modelNameKo) {
    let previousSweepId = null; // 이전 스윕의 ID를 저장할 변수를 초기화합니다.
    let previousTimestamp = null; // 이전 스윕의 타임스탬프를 저장할 변수를 초기화합니다.


    sdk.Sweep.current.subscribe(function (currentSweep) {

        // console.log("currentSweep.sid: ", currentSweep.sid);

        const currentSweepId = currentSweep.sid;
        const currentTimestamp = Date.now(); // 현재 시간을 가져옵니다.

        // 현재 스윕 정보만 처리합니다.
        if (currentSweepId !== "") {
            console.log("currentSweep.sid: ", currentSweep.sid);

            // 이전 스윕의 ID를 Google Analytics로 보냅니다.
            if (previousSweepId !== null) {

                // 머문 시간을 계산합니다.
                const timeSpent = (currentTimestamp - previousTimestamp); // 밀리초를 초로 변환합니다.

                gtag('event', modelNameKo + " " + previousSweepId, {
                    'value': timeSpent // 머문 시간을 Google Analytics에 전송합니다.
                });

                // 보낸 정보를 콘솔에 출력
                console.log("Sweep Metadata Sent:", {
                    'sweepId': previousSweepId,
                    'timeSpent': timeSpent
                });
            }

            // 이전 스윕의 ID와 타임스탬프를 현재 스윕의 ID와 타임스탬프로 업데이트합니다.
            previousSweepId = currentSweepId;
            previousTimestamp = currentTimestamp;
        }

    });


}
