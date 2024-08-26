export default function shadowRoot(sdk) {
    // // id가 "footer"인 요소를 찾습니다.
    // var matterportViewer = document.querySelector('matterport-viewer').shadowRoot;

    // // HTML 코드에서 최상위 요소 선택
    // const topLevelElement = matterportViewer.querySelector('.bottom-panel.detail-panel.scroller-contents');

    // // 콘솔에 출력
    // console.log(topLevelElement);


    // // var scrollerContents = matterportViewer.querySelector('.bottom-panel.detail-panel.scroller-contents');
    // var dockHidden = matterportViewer.querySelector('.panels.side-panel-right');

    //  // 콘솔에 출력
    //  console.log(dockHidden);

    // sdk.Tag.openTags.subscribe({
    //     prevState: {
    //         hovered: null,
    //         docked: null,
    //         selected: null,
    //     },
    //     onChanged(newState) {
    //         //   if (newState.hovered !== this.prevState.hovered) {
    //         //     if (newState.hovered) {
    //         //       console.log(newState.hovered, 'was hovered');
    //         //     } else {
    //         //       console.log(this.prevState.hovered, 'is no longer hovered');
    //         //     }
    //         //   }
    //         if (newState.docked !== this.prevState.docked) {
    //             if (newState.docked) {
    //                 // 독 열렸을 때 
    //                 console.log(newState.docked, 'was docked');
    //                 setTimeout(() => {
    //                     console.log("dockHidden: ", dockHidden);
    //                     console.log("dockHidden2: ", dockHidden2);
    //                 }, 1000);
    //             } else {
    //                 // 독 닫혔을 때
    //                 console.log(this.prevState.docked, 'was undocked');
    //                 console.log("dockHidden: ", dockHidden);

    //             }
    //         }

    //         //   // only compare the first 'selected' since only one tag is currently supported
    //         //   const [selected = null] = newState.selected; // destructure and coerce the first Set element to null
    //         //   if (selected !== this.prevState.selected) {
    //         //       if (selected) {
    //         //           console.log(selected, 'was selected');
    //         //       } else {
    //         //           console.log(this.prevState.selected, 'was deselected');
    //         //       }
    //         //   }

    //         // clone and store the new state
    //         this.prevState = {
    //             ...newState,
    //             // selected,
    //         };
    //     },
    // });
}