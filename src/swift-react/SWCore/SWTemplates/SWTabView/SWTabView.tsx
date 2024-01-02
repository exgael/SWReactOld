import React, {ReactNode, useEffect} from "react";
import {View} from "../../SWTypes";
import {IconType} from "react-icons";
import {TabItemModifiers} from "../../SWModifiers/tabViewModifier/tabItemModifiers";
import {useResponsive} from "../../SWProvider/useResponsive";
import PhoneLayout from "../../SWProvider/DeviceLayout/PhoneLayout";
import DesktopLayout from "../../SWProvider/DeviceLayout/DesktopLayout";
import {useTabView} from "./SWTabViewProvider";

export type TabViewComponent = View & {
    tabItems: TabItemComponent[];
}

export const SWTabView: React.FC<{ view: TabViewComponent }> = React.memo(
    ({ view }) => {

        const { activeTab, setActiveTab, tabs, setTabs } =  useTabView();

        console.log("Tabs", view.tabItems)

        useEffect(() => {

            // Populate tabs information into the context
            const tabInfo = view.tabItems.map(tabItem => ({
                key: tabItem.key!,
                title: tabItem.title,
                icon: tabItem.icon,
            }));

            setTabs(tabInfo);

            // Set the first tab as active
            setActiveTab(tabInfo[0].key);

        }, [view.tabItems, setTabs, setActiveTab]);


        // Responsive Layout
        const {isPhone} = useResponsive();
        // Variable to store the screen content
        let screen: ReactNode;

        // View to show when the Tab is active
         const content = view.tabItems.find(tab => tab.key === activeTab);

        if (!content) {
            return <div>Tab not found</div>;
        }

        if (isPhone) {
            screen = <PhoneLayout>{content.view.toJSX()}</PhoneLayout>;
            // Use top bar and bottom bar
        } else {
            screen = <DesktopLayout>{content.view.toJSX()}</DesktopLayout>;
            // Use header and footer
        }

        console.log("screen", screen)
        console.log("activeTab",  activeTab)

        return screen;
    }
);

// Tab Items
export type TabItemComponent = View
    & TabItemModifiers
    & {
    title: string
    view: View
    icon: IconType
}