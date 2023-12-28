import React, {useState} from 'react';
import {
    ForEachComponent,
    NavigationLink,
} from "../../SWTypes/Components";
import {ForEach, HStack, Text} from "../../../components";
import {View} from "../../SWTypes";
import {SWReactElement} from "../SWElements";
import {ChevronBack} from "../../../components/icons/chevrons";
import createComponent from "../componentFactory";
import {CoreModifiers} from "../../SWModifiers/core/coreModifers";
import {useResponsive} from "../../SWProvider/useResponsive";
import {fullscreenCover} from "../SWModals/FullscreenCover/FullscreenCoverStore";

export function TabSelectContent(navigationLinks: NavigationLink[], handleNavigation: (content: View)=> void ): TabSelectContentComponent {
    return createComponent<TabSelectContentComponent>(
        { render: function() { return (
                <SWTabSelectContent view={this as TabSelectContentComponent}/>
            )}},
        { navigationLinks: navigationLinks, handleNavigation: handleNavigation }
    );
}

export type TabSelectContentComponent = View
    & CoreModifiers<TabSelectContentComponent> & {
    navigationLinks: NavigationLink[]
    handleNavigation: (content: View)=> void
}

const SWTabSelectContent: React.FC<{view : TabSelectContentComponent}> = ( {view} ) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const { isPhone, isTablet } = useResponsive();

    return SWReactElement(
        view,
        (isPhone || isTablet) ? (
            ChevronBack(() => fullscreenCover.show(
                ContentLinkSelection(view.navigationLinks, view.handleNavigation)))
        ) : ( // Big device

            isCollapsed ? (
                // Don't Show Tab
                ChevronBack(() => toggleSidebar())
            ) : (
                // Show Tab
                HStack({alignment: "flex-start"})(
                    ContentLinkSelection(view.navigationLinks, view.handleNavigation)
                    ,
                    ChevronBack(() => toggleSidebar())
                )
                    .crossAxisAlignment("baseline")
            )
        )
    )
}

function ContentLinkSelection(navigationLinks: NavigationLink[] , handleNavigation: (content: View)=> void ): ForEachComponent {
    return ForEach(
        navigationLinks,
        (navLink: NavigationLink) => (
            Text(navLink.title)
                .setKey(navLink.id)
                .onClick(() => handleNavigation(navLink.content))
        )
    )
        .padding({left: "3vw"})
        .gap("4vh")
        .crossAxisAlignment("flex-start")
        .frame({width: "20vw", height: "100%"})
}
