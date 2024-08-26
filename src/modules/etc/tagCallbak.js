export default function tagCallBack(sdk) {
    return new Promise((resolve, reject) => {
        const tagInfoObject = {}; // 객체 초기화

        sdk.Tag.data.subscribe({
            onCollectionUpdated(collection) {
                for (const tagId in collection) {
                    if (collection.hasOwnProperty(tagId)) {
                        const tag = collection[tagId];
                        const { id, label } = tag;
                        tagInfoObject[id] = label; // 태그 ID를 키로 사용하여 객체에 저장
                    }
                }

                // // collection안에 객체를 배열로 변환해 키값(id)만 가져와서 이벤트 구현
                // for (let i = 0; i < Object.keys(collection).length; i++) {
                //     sdk.Tag.allowAction(Object.keys(collection)[i], {
                //         docking: true,
                //     });
                // };

                // 콜백 함수 내부에서 데이터를 반환합니다.
                resolve(tagInfoObject);
            }
        });
    });
}
