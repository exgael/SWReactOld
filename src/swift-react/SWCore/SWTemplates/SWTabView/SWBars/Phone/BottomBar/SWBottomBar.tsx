import React from "react";
import {HStack} from "../../../../../../components";
import {Color, View} from "../../../../../SWTypes";
import {BottomBarItem} from "./SWBottomBarItem";
import {SWView} from "../../../../../SWElements/SWElements";
import {TabInfo, useTabView} from "../../../SWTabViewProvider";


export const SWBottomBar: React.FC<{ view: View }> = React.memo(
    ({ view }) => {
        const { tabs, activeTabKey, setActiveTabKey } = useTabView()

        const items= tabs.map(
            (tab: TabInfo) => {

                // If the current tab matches the key of the item, we want to highlight it
                const isHighlighted = activeTabKey === tab.key;

                return BottomBarItem(tab.title, tab.key, isHighlighted ? <tab.iconActive size={24}/> : <tab.icon size={24}/>)
                    // Frame width is screen width divided by number of items
                    // For equal distribution of items
                    .frame({width: `${100 / tabs.length}vw`, height: "100%"})

                    // Setting the background color of the item
                    .foregroundStyle(isHighlighted ? Color.olive: Color.grey)

                    .onClick(() => {
                        // Navigate to the corresponding tab
                        setActiveTabKey(tab.key);
                    })
            });

        // Constructing the BottomBar layout
        const bottomBarLayout = HStack({ alignment: "space-between" })(
                ...items
        )
            .setClassName(["glass", "bottom-bar"])
            .crossAxisAlignment("flex-start")

        return (
            <SWView view={view}>
                {bottomBarLayout.toJSX()}
            </SWView>
        );
    }
);