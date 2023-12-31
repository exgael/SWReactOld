import React, {useRef, useState} from 'react';
import {
    ForEachComponent,
    QuickLink,
    ThreePartLayoutComponent
} from "../../SWTypes/Components";
import {ForEach, HStack, Text, VStack} from "../../../components";
import {Color, View} from "../../SWTypes";
import {SWReactElement} from "../../SWElements/SWElements";
import {TabSelectContent} from "./TabSelectContent";
import {useResponsive} from "../../SWProvider/useResponsive";

const SWDocumentationBySection: React.FC<{view : ThreePartLayoutComponent}> = ({view} ) => {
    const [activeSectionID, setActiveSectionID] = useState<string>(view.sections[0]?.id);
    const [quickLinks, setQuickLinks] = useState<QuickLink[]>(view.sections[0]?.quickLinks || []);
    const contentRef = useRef<HTMLDivElement>(null);
    const { isDesktop, isTablet } = useResponsive();

    const handleContentSwitch = (activeSectionID: string) => {
        setActiveSectionID(activeSectionID)
        const correspondingNavLink = view.sections.find(navLink => navLink.id === activeSectionID);
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
            TabSelectContent(view.sections, handleContentSwitch)
            ,

            ActiveContent(view.sections.find(section => section.id === activeSectionID)!.view)
                .setRef(contentRef)
                .frame(isDesktop ? {width: "59vw", height: "100%"} : isTablet ?  {width: "65vw", height: "100%"} : {width: "80vw", height: "100%"})
            ,

            isDesktop ? (
                TabQuickScroll(quickLinks, scrollToQuickLink)
                    .positionFixedSide("right")
            ) : (
                Text("")
            )
        )
            .frame({width: "100vw", height: "100%"})
            .crossAxisAlignment("baseline")
            .margin({top: "5vh", left: isTablet? "5vw" : "0px"})
    )
}

function ActiveContent(activeContent: View) {
    return   VStack({gap: "10px"})(
        activeContent
    )
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

export default SWDocumentationBySection;
