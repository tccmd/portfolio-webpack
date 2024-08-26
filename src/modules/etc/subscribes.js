import { openBottomSheetHeight, closeBottomSheetHeight } from "../ui/bottomSheet";

// 구독에 따라 업데이트할 요소
var matterportViewer = document.querySelector('matterport-viewer').shadowRoot;
var footerElement = matterportViewer.getElementById("footer");

const subscribes = async (sdk) => {
  // // ---------- 구독에 따라 업데이트할 메서드 ----------
  // // 현재 층 구독
  // await sdk.Floor.current.subscribe((currentFloor) => {
  //   // console.log("currentFloor: ", currentFloor);
  //   if (currentFloor.name !== "") {
  //     currentFloorElement.textContent = currentFloor.name;
  //     // badgeElement.classList.remove("badge-accent");
  //     // badgeElement.classList.add("badge-info");
  //   } else {
  //     // currentFloorElement.textContent = "Loading...";
  //     // 클래스 변경
  //     // badgeElement.classList.remove("badge-info");
  //     // badgeElement.classList.add("badge-accent");
  //   }
  //   // currentFloorElement.textContent = currentFloor.name;
  // });
  // // 상태 구독
  // await sdk.App.state.subscribe(function (appState) {
  //   console.log("appState: ", appState)

  //   if (appState.phase === sdk.App.Phase.LOADING) {
  //     console.log('The app has started loading!')
  //   }
  //   if (appState.phase === sdk.App.Phase.STARTING) {
  //     console.log('The transition into the start location begins!')
  //   }
  //   if (appState.phase === sdk.App.Phase.PLAYING) {
  //     console.log('The app is ready to take user input now!')
  //     // 클래스 변경
  //     badgeElement.classList.remove("badge-accent");
  //     badgeElement.classList.add("badge-info");
  //   }
  // });
  // // --------------------------------------------
  // 라벨 구독
  // await sdk.Label.data.subscribe({
  //   onAdded: function (index, item, collection) {
  //     console.log('Label added to the collection', index, item, collection);
  //   },
  //   onRemoved: function (index, item, collection) {
  //     console.log('Label removed from the collection', index, item, collection);
  //   },
  //   onUpdated: function (index, item, collection) {
  //     console.log('Label updated in place in the collection', index, item, collection);
  //   },
  //  });
  // 방 구독
  // await sdk.Room.data.subscribe({
  //   onCollectionUpdated: function (collection) {
  //     // console.log('Collection received. There are ', Object.keys(collection).length, 'rooms in the collection');
  //     console.log(collection)
  //   }
  // });
  // 현재 방 구독
  // await sdk.Room.current.subscribe(function (currentRooms) {
  //   if (currentRooms.rooms.length > 0) {
  //     // console.log('currently in', currentRooms.rooms.length, 'rooms');
  //     console.log("currentRooms: ", currentRooms);
  //   } else {
  //     console.log('Not currently inside any rooms');
  //   }
  // });
  // 스윕 구독
  // sdk.Sweep.data.subscribe({
  //   onAdded: function (index, item, collection) {
  //     console.log('sweep added to the collection', index, item, collection);
  //   },
  //   onRemoved: function (index, item, collection) {
  //     console.log('sweep removed from the collection', index, item, collection);
  //   },
  //   onUpdated: function (index, item, collection) {
  //     console.log('sweep updated in place in the collection', index, item, collection);
  //   },
  //   onCollectionUpdated: function (collection) {
  //     console.log('the entire up-to-date collection', collection);
  //   }
  // });
  // 현재 스윕 구독 
  sdk.Sweep.current.subscribe(function (currentSweep) {
    // Change to the current sweep has occurred.
    // console.log("currentSweep: ", currentSweep)

    // 이동중일 때 바텀시트 닫고 정지상태일 때 열기
    if (currentSweep.uuid === "") { // 이동중일 때는 uuid가 "" // <= 이동중이면이라는 조건
      closeBottomSheetHeight();
    } else {
      // 태그에 접근할 때 바텀시트 제어하기 위함
      // footer 요소 존재 여부 다시 평가
      footerElement = matterportViewer.getElementById("footer");
      if (footerElement) {
        openBottomSheetHeight();
      }
    }
  });

  // // bottomsheetContainer의 높이가 120px이고 이동중일때만 닫기
  // if (currentSweep.uuid === "" && bottomsheetContainer.style.height === '120px') {
  //   toggleBottomSheet(false);
  // } else if (currentSweep.uuid !== "" && bottomsheetContainer.style.height === '120px') {
  //   toggleBottomSheet(true);
  // }
  // if (currentSweep.uuid === "") {
  //   toggleBottomSheet();
  // } else {
  //   toggleBottomSheet();
  // }
  // if (currentSweep.sid === '') {
  //   console.log('Not currently stationed at a sweep position');
  // } else {
  //   console.log('Currently at sweep', currentSweep.sid);
  //   console.log('Current position', currentSweep.position);
  //   console.log('On floor', currentSweep.floorInfo.sequence);
  // }
  // });
  // 포인터 구독
  // sdk.Pointer.intersection.subscribe(function (intersectionData) {
  //     // Changes to the intersection data have occurred.
  //     console.log('Intersection position:', intersectionData.position);
  //     console.log('Intersection normal:', intersectionData.normal);
  // });
  // 카메라 포즈 데이터 구독
  // sdk.Camera.pose.subscribe(function (pose) {
  //     // Changes to the Camera pose have occurred.
  //     console.log('Current position is ', pose.position);
  //     console.log('Rotation angle is ', pose.rotation);
  //     // sdk.Camera.zoomReset();
  //     // console.log('Sweep UUID is ', pose.sweep);
  //     // console.log('View mode is ', pose.mode);
  //   });
  // 줌 구독
  // sdk.Camera.zoom.subscribe(async function (zoom) {
  //     // the zoom level has changed
  //     console.log('Current zoom is ', zoom.level);
  //     // await sdk.Camera.zoomTo(0.7);
  //     // 최소값 0.7 // 최대값 3
  //   });
  // 팬
  // sdk.Camera.pan({ x: 1, z: 1 })
  //   .then(function () {
  //     // Pan complete.
  //   })
  //   .catch(function (error) {
  //     // Pan error.
  //   });
  // setRotation - 처언천히 돌아감
  // sdk.Camera.setRotation({ x: 10, y: -20 }, { speed: 2 })
  // .then(function() {
  //   // Camera rotation complete.
  // })
  // .catch(function(error) {
  //   // Camera rotation error.
  // });
  // View
  // 현재 활성화된 보기
  // await sdk.View.current.subscribe((currentView) => {
  //   console.log('the currently active view is', currentView.name);
  // });
  // await sdk.Tour.getData()
  // .then(function(snapshots) {
  //   // Tour getData complete.
  //   if(snapshots.length > 0){
  //     console.log('First snapshot sid: ' + snapshots[0].sid);
  //     console.log('First snapshot name: ' + snapshots[0].name);
  //     console.log('First snapshot position: ' + snapshots[0].position);
  //     console.log(snapshots);
  //   }
  // })
  // .catch(function(error) {
  //   // Tour getData error.
  // });
  // 현재 공간과 관련된 모든 레이어. // 비활성 뷰의 레이어는 즉시 채워지지 않을 수 있습니다. 뷰를 활성화하면 레이어가 채워질 수 있습니다.
  // await sdk.View.layers.subscribe({
  //   onAdded(index, layer, collection) {
  //     console.log('a layer with id', layer.id, 'named', layer.name);
  //   },
  //   onCollectionUpdated(collection) {
  //     console.log('all layers', collection);
  //   },
  // });
  // 현재 공간과 관련된 모든 견해.
  // await sdk.View.views.subscribe({
  //   onAdded(index, view, collection) {
  //     console.log('a view with id', view.id, 'named', view.name);
  //   },
  //   onCollectionUpdated(collection) {
  //     console.log('all views', collection);
  //   },
  // });
  // 라벨 셋팅 불린
  // sdk.Settings.get('labels')
  //           .then(function(data) {
  //             // Setting retrieval complete.
  //             console.log('Labels setting: ' + data);
  //           })
  //           .catch(function(error) {
  //             // Setting  retrieval error.
  //           });
  // 모드 구독
  // sdk.Mode.current.subscribe(function (mode) {
  //   // the view mode has changed
  //   console.log('Current view mode is is ', mode);
  // });
  // 전환 구독
  // sdk.Mode.transition.subscribe(function (transition) {
  //   // the transition has changed
  //   console.log(transition.from, transition.to, transition.progress);
  // });
  // 태그 구독
  // sdk.Tag.data.subscribe({
  //   onAdded(index, item, collection) {
  //     console.log('Tag added to the collection', index, item, collection);
  //   },
  //   onRemoved(index, item, collection) {
  //     console.log('Tag removed from the collection', index, item, collection);
  //   },
  //   onUpdated(index, item, collection) {
  //     console.log('Tag updated in place in the collection', index, item, collection);
  //   },
  //   onCollectionUpdated(collection) {
  //     console.log('The full collection of Tags looks like', collection);
  //   }
  // });
}

export default subscribes;