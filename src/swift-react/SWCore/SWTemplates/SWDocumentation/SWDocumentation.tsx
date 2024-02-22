import React, {useRef, useState} from 'react';
import {ForEachComponent, QuickLink, Section, ThreePartLayoutComponent} from "../../SWTypes/Components";
import {ForEach, HStack, NavigationLink, Text, VStack} from "../../../components";
import {Color, View} from "../../SWTypes";
import {SWReactElement} from "../../SWElements/SWElements";
import {useResponsive} from "../../SWProvider/useResponsive";
import {TabSelectContent} from "./TabSelectContent";

const SWDocumentationBySection: React.FC<{ view: ThreePartLayoutComponent }> = ({view}) => {
    const [activeSectionID, setActiveSectionID] = useState<string>(view.sections[0]?.id);
    const [quickLinks, setQuickLinks] = useState<QuickLink[]>(view.sections[0]?.quickLinks || []);
    const contentRef = useRef<HTMLDivElement>(null);
    const {isDesktop, isTablet} = useResponsive();

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
    }

    const Links = ForEach(
        view.sections,
        (section) => (
            NavigationLink(
                NavLinkLabel(section),
                section.view,
                section.title
            )
        )
    )

    return SWReactElement(
        view,
        isDesktop ? (

            HStack(
                TabSelectContent(view.sections, handleContentSwitch)
                ,

                ActiveContent(view.sections.find(section => section.id === activeSectionID)!.view)
                    .setRef(contentRef)
                    .frame(isDesktop ? {width: "59vw", height: "100%"} : isTablet ?  {width: "65vw", height: "100%"} : {width: "80vw", height: "100%"})
                ,

                TabQuickScroll(quickLinks, scrollToQuickLink)
                    .positionFixedSide("right")
            )
                .frame({width: "100vw", height: "100%"})
                .crossAxisAlignment("baseline")
                .mainAxisAlignment("space-between")
                .margin({left: isTablet? "5vw" : "0px"})

        ) : (
            Links
                .gap("50px")
        )
    )
}

function ActiveContent(activeContent: View) {
    return VStack(
        activeContent
    )
        .gap("10px")
}

function TabQuickScroll(quickLinks: QuickLink[], scrollToQuickLink: (id: string) => void): ForEachComponent {
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
