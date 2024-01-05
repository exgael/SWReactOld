import React, {useState} from 'react';
import {
    ForEachComponent,
    Section,
} from "../../SWTypes/Components";
import {ForEach, HStack, Text} from "../../../components";
import {Color, View} from "../../SWTypes";
import {SWReactElement} from "../../SWElements/SWElements";
import {ChevronBack} from "../../../components/icons/chevrons";
import createComponent from "../../SWElements/componentFactory";
import {CoreModifiers} from "../../SWModifiers/core/coreModifers";
import {useResponsive} from "../../SWProvider/useResponsive";
import {FullscreenCover} from "../../../components/modals/FullscreenCover";
import {MdOutlineMenuBook} from "../../../components/icons/menu";

export function TabSelectContent(sections: Section[], handleSectionSwitch: (contentId: string) => void): TabSelectContentComponent {
    return createComponent<TabSelectContentComponent>(
        {
            toJSX: function () {
                return (
                    <SWTabSelectContent view={this as TabSelectContentComponent}/>
                )
            }
        },
        {sections: sections, handleNavigation: handleSectionSwitch}
    );
}

export type TabSelectContentComponent = View
    & CoreModifiers<TabSelectContentComponent> & {
    sections: Section[]
    handleNavigation: (contentId: string) => void
}

const SWTabSelectContent: React.FC<{ view: TabSelectContentComponent }> = ({view}) => {
    const [showSections, setShowSections] = useState(false);
    const toggleShowSections = () => {
        setShowSections(!showSections);
    };

    const {isPhone, isTablet, isDesktop} = useResponsive();

    const handleSectionSwitch = (contentId: string): void => {
        view.handleNavigation(contentId)
        if (isPhone || isTablet) {
            setShowSections(false)
        }
    }

    const sectionSelection = SectionSelection(view.sections, handleSectionSwitch)
        .crossAxisAlignment(isDesktop ? "flex-start" : "center")

    return SWReactElement(
        view,
        (isPhone || isTablet) ? (

            showSections ? (
                FullscreenCover(sectionSelection, toggleShowSections)
                    .setClassName(["glass"])
            ) : (
                MdOutlineMenuBook(() => toggleShowSections())
                   // .position(0, 0)
                    .positionFixedSide("left")
                    .padding({left: "2vh", bottom: "5vh"})
                    .positionFixedTrailingTopBar()
            )

        ) : ( // Big device
            showSections ? (
                MdOutlineMenuBook(() => toggleShowSections())
            ) : (
                HStack(
                    sectionSelection
                        .positionFixedSide("left")
                    ,
                  //  MdOutlineMenuBook(() => toggleShowSections())
                )
                    .mainAxisAlignment("flex-start")
                    .crossAxisAlignment("baseline")
            )
        )
    )
}

export function SectionSelection(navigationLinks: Section[], handleNavigation: (contentId: string) => void): ForEachComponent {
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
        .foregroundStyle(Color.black)
        .frame({width: "100%", height: "100%"})
}
