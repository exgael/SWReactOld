import React from "react";
import {NavigationLink, Text, VStack} from "../../../../../components";
import {Color, View} from "../../../../SWTypes";
import { useSelector } from 'react-redux';
import {NavigationLinkComponent} from "../../../../SWTypes/Components";
import {Destination} from "../../../../SWProvider/useNavigate";
import userBarStore from "./UserBarStore";
import {TabInfo, useTabView} from "../../SWTabViewProvider";

export const SWSideBar: React.FC<{ view: View }> = React.memo(
    ({ view }) => {

        const { tabs, activeTab, setActiveTab } = useTabView()

        const navLinks: NavigationLinkComponent[] = tabs.map(
            (tab: TabInfo) => NavigationLink(Text(tab.title), Text(tab.key))
        );

        // Constructing the UserFlowBar layout
        const appBarLayout = VStack({alignment: "space-around"})(
            ...navLinks
        )
            .setClassName(["glass", "sidebar"])
            .foregroundStyle(Color.navy)
            .toJSX();

        return (
            <div style={view.style}  {...view.events}>
                {appBarLayout}
            </div>
        );
    }
);