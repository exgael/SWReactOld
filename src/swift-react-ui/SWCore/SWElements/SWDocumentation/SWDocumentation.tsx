import React, {useRef, useState} from 'react';
import {
    ForEachComponent,
    QuickLink,
    ThreePartLayoutComponent
} from "../../SWTypes/Components";
import {Button, ForEach, HStack, Text, VStack} from "../../../components";
import {Color, View} from "../../SWTypes";
import {SWReactElement} from "../SWElements";
import {TabSelectContent} from "./TabSelectContent";
import {useResponsive} from "../../SWProvider/useResponsive";

const SWThreePartLayout: React.FC<{view : ThreePartLayoutComponent}> = ( {view} ) => {
    const [activeContent, setActiveContent] = useState<View>(view.navigationLinks[0]?.content);
    const [quickLinks, setQuickLinks] = useState<QuickLink[]>(view.navigationLinks[0]?.quickLinks || []);

    const contentRef = useRef<HTMLDivElement>(null);
    const { isDesktop } = useResponsive();
    const handleNavigation = (content: View) => {
        setActiveContent(content);
        const correspondingNavLink = view.navigationLinks.find(navLink => navLink.content === content);
        setQuickLinks(correspondingNavLink?.quickLinks || []);
    };

    const scrollToQuickLink = (id: string) => {
        const element = contentRef.current?.querySelector(`#${id}`);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    };
    return SWReactElement(
        view,
        HStack({alignment: "space-between"})(
            TabSelectContent(view.navigationLinks, handleNavigation)
            ,

            ActiveContent(activeContent)
                .setRef(contentRef)
            ,

            isDesktop ? (
                TabQuickScroll(quickLinks, scrollToQuickLink)
            ) : (
                Text("")
            )
        )
            .frame({width: "100vw", height: "100%"})
            .crossAxisAlignment("baseline")
            .margin({top: "5vh"})
    )
}

function ActiveContent(activeContent: View) {
    return   VStack({gap: "10px"})(
        activeContent
    )
        .frame({width: "59vw", height: "100%"})
}

function TabQuickScroll(quickLinks: QuickLink[] , scrollToQuickLink: (id: string)=> void ): ForEachComponent {
    return ForEach(
        quickLinks,
        (link: QuickLink) => (
            Text(link.headline)
                .onClick(() => scrollToQuickLink(link.id))
                .setKey(link.id)
                .foregroundStyle(Color.olive)
        )
    )
        .frame({width: "20vw", height: "100%"})
        .gap("10px")
        .padding({right: "3vw"})
        .crossAxisAlignment("flex-end")

}

export default SWThreePartLayout;
