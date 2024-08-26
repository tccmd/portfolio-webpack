// 독 디자인과 독 안의 아이콘

export default async function icon(sdk) {
    sdk.Tag.openTags.subscribe({
        prevState: {
            hovered: null,
            docked: null,
            selected: null,
        },
        onChanged(newState) {
            if (newState.hovered !== this.prevState.hovered) {
                if (newState.hovered) {
                    // console.log(newState.hovered, 'was hovered');
                } else {
                    // console.log(this.prevState.hovered, 'is no longer hovered');
                }
            }
            if (newState.docked !== this.prevState.docked) {
                if (newState.docked) {
                    // currentTag = newState.docked;
                    // console.log(newState.docked, 'was docked');
                } else {
                    // console.log(this.prevState.docked, 'was undocked');
                }
            }
            const [selected = null] = newState.selected;
            if (selected !== this.prevState.selected) {


                if (selected) {
                    var matterportViewer = document.querySelector('matterport-viewer').shadowRoot;
                    var dockHidden = matterportViewer.querySelector('.panels.side-panel-right');

                    var mainPanel = matterportViewer.querySelector('main');
                    mainPanel.classList.add('narrow-layout');
                    setTimeout(() => {
                        if (mainPanel.classList.contains('tool-open')) {
                            mainPanel.classList.add('bottom-panel');
                            mainPanel.classList.add('narrow-layout');
                            mainPanel.classList.remove('side-panel');
                        }
                    }, 50)

                    setTimeout(() => {
                        if (dockHidden.classList.contains('panel-open')) {
                            var badgeIcon = dockHidden.querySelector('.badge .icon');
                            if (badgeIcon.classList.contains('icon-public_people_person-to-door')) {
                                dockHidden.querySelector('.badge .icon-public_people_person-to-door').style.backgroundImage = `url(https://도메인/보안/common/icons_fill_lobby_24px.svg)`;
                            } // lobby
                            else if (badgeIcon.classList.contains('icon-public_furniture_bed')) {
                                dockHidden.querySelector('.badge .icon-public_furniture_bed').style.backgroundImage = `url(https://도메인/보안/common/icons_fill_room_24px.svg)`;
                            } // bed
                            else if (badgeIcon.classList.contains('icon-public_objects_glass')) {
                                dockHidden.querySelector('.badge .icon-public_objects_glass').style.backgroundImage = `url(https://도메인/보안/common/icons_fill_amenity_24px.svg)`;
                            } // glass
                            else if (badgeIcon.classList.contains('icon-public_people_children')) {
                                dockHidden.querySelector('.badge .icon-public_people_children').style.backgroundImage = `url(https://도메인/보안/common/icons_tag_wash_R100_1024px.svg)`;
                            } // bathroom
                            else if (badgeIcon.classList.contains('icon-public_furniture_shower')) {
                                dockHidden.querySelector('.badge .icon-public_furniture_shower').style.backgroundImage = `url(https://도메인/보안/common/icons_fill_signatureshower_24px.svg)`;
                            } // shower
                            else if (badgeIcon.classList.contains('icon-public_objects_palette')) {
                                dockHidden.querySelector('.badge .icon-public_objects_palette').style.backgroundImage = `url(https://도메인/보안/common/icons_fill_product3_24px.svg)`;
                            } // pallet
                        } else {
                        }
                    }, 100);

                } else {
                    // console.log(this.prevState.selected, 'was deselected');
                }


            }
            // clone and store the new state
            this.prevState = {
                ...newState,
                selected,
            };
        },
    });
}