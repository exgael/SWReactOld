import React from "react";
import {HStack, Text} from "../../../../../components";
import {Color, View} from "../../../../SWTypes";
import {TabInfo, useTabView} from "../../SWTabViewProvider";
import {SWView} from "../../../../SWElements/SWElements";

export const SWAppBar: React.FC<{ view: View }> = React.memo(
    ({view}) => {
        const {tabs, setActiveTabKey} = useTabView()

        const links = tabs.map(
            (tab: TabInfo) => Text(tab.title)
                .onClick(() => setActiveTabKey(tab.key))
                // .frame({width: `${100 / 3}vw`, height: "100%"})
                // .textAlign("center")
        );

        // Constructing the UserFlowBar layout
        const appBarLayout = HStack(
            ...links
        )
            .mainAxisAlignment("space-between")
            .foregroundStyle(Color.black)

        view.classNames = ["navigation-bar", "glass"];
        return (
            <SWView view={view}>
                {appBarLayout.toJSX()}
            </SWView>
        );
    }
);