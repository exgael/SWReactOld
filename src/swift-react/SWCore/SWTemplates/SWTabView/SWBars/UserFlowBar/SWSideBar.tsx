import React from "react";
import {NavigationLink, Text, VStack} from "../../../../../components";
import {Color, View} from "../../../../SWTypes";
import {NavigationLinkComponent} from "../../../../SWTypes/Components";
import {TabInfo, useTabView} from "../../SWTabViewProvider";

export const SWSideBar: React.FC<{ view: View }> = React.memo(
    ({view}) => {

        const {tabs, activeTabKey, setActiveTabKey} = useTabView()

        const navLinks: NavigationLinkComponent[] = tabs.map(
            (tab: TabInfo) => NavigationLink(Text(tab.title), Text(tab.key))
        );

        // Constructing the UserFlowBar layout
        const appBarLayout = VStack(
            ...navLinks
        )
            .setClassName(["glass", "sidebar"])
            .mainAxisAlignment("space-between")
            .foregroundStyle(Color.navy)
            .toJSX();

        return (
            <div style={view.style}  {...view.events}>
                {appBarLayout}
            </div>
        );
    }
);