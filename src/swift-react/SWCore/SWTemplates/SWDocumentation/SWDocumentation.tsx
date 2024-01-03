import React, {useRef, useState} from 'react';
import {
    ForEachComponent,
    QuickLink, Section,
    ThreePartLayoutComponent
} from "../../SWTypes/Components";
import {ForEach, HStack, NavigationLink, RoundedRectangle, Text, VStack} from "../../../components";
import {Color, View} from "../../SWTypes";
import {SWReactElement} from "../../SWElements/SWElements";
import {TabSelectContent} from "./TabSelectContent";
import {useResponsive} from "../../SWProvider/useResponsive";
import {useNavigate} from "../../SWProvider/useNavigate";
import {useNavigationStack} from "../../SWProvider/NavigationStack/NavigationStackContext";

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

    const NavLinkLabel = (section: Section) => {
        return Text(section.title)
            .setNavigationTitle(section.title)
            .frame({width: "100%", height: "100%"})
            .opacity(1)
            .background(
                RoundedRectangle("15%")
                    .frame({width: "100%", height: "100%"})
                    .background(Color.olive)
                    .opacity(1)
            )
    }

    const Links = ForEach(
        view.sections,
        (section) => (
           NavigationLink(NavLinkLabel(section), section.view, section.title)
        )
    )

    return SWReactElement(
        view,
        Links
            .crossAxisAlignment("center")
            .gap("50px")
            .padding({left: "3vw"})
            .padding({top: "5vh"})
            .frame({width: "100vw", height: "100%"})


        // HStack({alignment: "space-between"})(
        //     TabSelectContent(view.sections, handleContentSwitch)
        //     ,
        //
        //     ActiveContent(view.sections.find(section => section.id === activeSectionID)!.view)
        //         .setRef(contentRef)
        //         .frame(isDesktop ? {width: "59vw", height: "100%"} : isTablet ?  {width: "65vw", height: "100%"} : {width: "80vw", height: "100%"})
        //     ,
        //
        //     isDesktop ? (
        //         TabQuickScroll(quickLinks, scrollToQuickLink)
        //             .positionFixedSide("right")
        //     ) : (
        //         Text("")
        //     )
        // )
        //     .frame({width: "100vw", height: "100%"})
        //     .crossAxisAlignment("baseline")
        //     .margin({left: isTablet? "5vw" : "0px"})
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
