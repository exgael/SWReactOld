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
import {FullscreenCover} from "../../../components/modals/FullscreenCover";
export function TabSelectContent(sections: Section[], handleSectionSwitch: (contentId: string)=> void ): TabSelectContentComponent {
    return createComponent<TabSelectContentComponent>(
        { render: function() { return (
                <SWTabSelectContent view={this as TabSelectContentComponent}/>
            )}},
        { sections: sections, handleNavigation: handleSectionSwitch }
    );
}

export type TabSelectContentComponent = View
    & CoreModifiers<TabSelectContentComponent> & {
    sections: Section[]
    handleNavigation: (contentId: string)=> void
}

const SWTabSelectContent: React.FC<{view : TabSelectContentComponent}> = ( {view} ) => {
    const [showSections, setShowSections] = useState(false);
    const toggleShowSections = () => {
        setShowSections(!showSections);
    };

    const { isPhone, isTablet } = useResponsive();

    const handleSectionSwitch = (contentId: string): void => {
        view.handleNavigation(contentId)
        if (isPhone || isTablet) {
            setShowSections(false)
        }
    }

    const sectionSelection = SectionSelection(view.sections, handleSectionSwitch)

    return SWReactElement(
        view,
        (isPhone || isTablet) ? (

            showSections ? (
                FullscreenCover(sectionSelection, toggleShowSections)
            ) : (
                ChevronBack(() => toggleShowSections())
            )

            ) : ( // Big device
            showSections ? (
                ChevronBack(() => toggleShowSections())
            ) : (
                HStack({alignment: "flex-start"})(
                    sectionSelection
                        .positionFixedSide("left")
                    ,
                    ChevronBack(() => toggleShowSections())
                )
                    .crossAxisAlignment("baseline")
            )
        )
    )
}

export function SectionSelection(navigationLinks: Section[], handleNavigation: (contentId: string)=> void ): ForEachComponent {
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
