// 탭2 태그로 이동 버튼 (태그 색, 아이콘, 탭 안 태그 클릭 작동)
export default function tags(sdk) {
    sdk.Tag.data.subscribe({
        onCollectionUpdated(collection) {
            const arrCollection = Object.values(collection);

            // 아이콘 (1. 공간에서 보이는 태그 아이콘) // 호스팅 시 폴더 정리를 위해서 경로를 이렇게 정함
            const floorTagIconMap = [
                { label: '입구', src: '../viewtagicons/icons_tag_lobby_R100_1024px.svg' },
                { label: '침실', src: '../viewtagicons/icons_tag_room_R100_1024px.svg' },
                { label: '작품', src: '../viewtagicons/icons_tag_product3_room_R100_1024px.svg' },
                { label: '작품1', src: '../viewtagicons/icons_tag_product3_room_R100_1024px.svg' },
                { label: '작품2', src: '../viewtagicons/icons_tag_product3_room_R100_1024px.svg' },
                { label: '작품3', src: '../viewtagicons/icons_tag_product3_room_R100_1024px.svg' },
                { label: '작품4', src: '../viewtagicons/icons_tag_product3_room_R100_1024px.svg' },
                { label: '욕실', src: '../viewtagicons/icons_tag_wash_R100_1024px.svg' },
                { label: '샤워실', src: '../viewtagicons/icons_tag_signatureshower_R100_1024px.svg' },
                // { label: '어메니티 소개', src: './viewtagicons/icons_tag_amenity_R100_1024px.svg' },
            ]
            // 아이콘 적용
            floorTagIconMap.forEach((icon) => {
                sdk.Asset.registerTexture(icon.label, icon.src);

                const findIconTag = arrCollection.filter(tagArr => tagArr.label === icon.label); // 똑같은 이름이 2개일경우가 있기 때문에 filter 사용
                findIconTag.forEach(iconTag => { // 똑같은 이름이 2개일 경우가 있기 때문에 forEach 사용
                    // 아이콘 편집
                    sdk.Tag.editIcon(iconTag.id, icon.label);
                    // 아이콘 배경 컬러 편집
                    sdk.Tag.editColor(iconTag.id, {
                        r: 0.827,
                        g: 0.682,
                        b: 0.353,
                    });
                })
            });

            // collection안에 객체를 배열로 변환해 키값(id)만 가져와서 이벤트 구현 (이거 주석 처리하니 이동이 요란함)
            for (let i = 0; i < Object.keys(collection).length; i++) {
                sdk.Tag.allowAction(Object.keys(collection)[i], {
                    docking: true,
                });
            };
        },
    });
}