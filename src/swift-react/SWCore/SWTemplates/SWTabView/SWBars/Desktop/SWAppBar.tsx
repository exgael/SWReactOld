import React from "react";
import {HStack, Text} from "../../../../../components";
import {Color, View} from "../../../../SWTypes";
import {TabInfo, useTabView} from "../../SWTabViewProvider";
import {SWView} from "../../../../SWElements/SWElements";

export const SWAppBar: React.FC<{ view: View }> = React.memo(
    ({view}) => {
        const {tabs, setActiveTabKey} = useTabView()

        // const navLinks: NavigationLinkComponent[] = tabs.map(
        //     (tab: TabInfo) => NavigationLink(Text(tab.title), tab.)
        // );

        const links = tabs.map(
            (tab: TabInfo) => Text(tab.title).onClick(() => setActiveTabKey(tab.key)
            ));

        // Constructing the UserFlowBar layout
        const appBarLayout = HStack(
            ...links
        )
            .mainAxisAlignment("space-between")
            .setClassName(["glass", "header-bar"])
            .foregroundStyle(Color.black)

        return (
            <SWView view={view}>
                {appBarLayout.toJSX()}
            </SWView>
        );
    }
);