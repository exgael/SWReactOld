import React, {useState} from 'react';
import {
    ForEachComponent,
    Section,
} from "../../SWTypes/Components";
import {ForEach, HStack, Text} from "../../../components";
import {View} from "../../SWTypes";
import {SWReactElement} from "../SWElements";
import {ChevronBack} from "../../../components/icons/chevrons";
import createComponent from "../componentFactory";
import {CoreModifiers} from "../../SWModifiers/core/coreModifers";
import {useResponsive} from "../../SWProvider/useResponsive";
import {useFullscreenCover} from "../../SWProvider/Modals/FullscreenCoverContext";

export function TabSelectContent(navigationLinks: Section[], handleNavigation: (contentId: string)=> void ): TabSelectContentComponent {
    return createComponent<TabSelectContentComponent>(
        { render: function() { return (
                <SWTabSelectContent view={this as TabSelectContentComponent}/>
            )}},
        { navigationLinks: navigationLinks, handleNavigation: handleNavigation }
    );
}

export type TabSelectContentComponent = View
    & CoreModifiers<TabSelectContentComponent> & {
    navigationLinks: Section[]
    handleNavigation: (contentId: string)=> void
}

const SWTabSelectContent: React.FC<{view : TabSelectContentComponent}> = ( {view} ) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isPhone, isTablet } = useResponsive();
    const { showCover, hideCover } = useFullscreenCover();
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNavigation = (contentId: string): void => {
        view.handleNavigation(contentId)
        hideCover()
    }

    const contentSelection = ContentLinkSelection(view.navigationLinks, handleNavigation)

    return SWReactElement(
        view,
        (isPhone || isTablet) ? (
            ChevronBack(() => showCover(contentSelection))
        ) : ( // Big device
            isCollapsed ? (
                // Don't Show Tab
                ChevronBack(() => toggleSidebar())
            ) : (
                // Show Tab
                HStack({alignment: "flex-start"})(
                    contentSelection
                        .positionFixedSide("left")
                    ,
                    ChevronBack(() => toggleSidebar())
                )
                    .crossAxisAlignment("baseline")
            )
        )
    )
}

export function ContentLinkSelection(navigationLinks: Section[], handleNavigation: (contentId: string)=> void ): ForEachComponent {
    return ForEach(
        navigationLinks,
        (navLink: Section) => (
            Text(navLink.title)
                .setKey(navLink.id)
                .onClick(() => handleNavigation(navLink.id))
        )
    )
        .padding({left: "3vw"})
        .gap("4vh")
        .crossAxisAlignment("flex-start")
        .frame({width: "20vw", height: "100%"})
}
