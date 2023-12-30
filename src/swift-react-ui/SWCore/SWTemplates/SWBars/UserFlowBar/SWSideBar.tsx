import React from "react";
import {NavigationLink, Text, VStack} from "../../../../components";
import {Color, View} from "../../../SWTypes";
import { useSelector } from 'react-redux';
import {NavigationComponent} from "../../../SWTypes/Components";
import {Destination} from "../../../SWProvider/useNavigate";
import userBarStore from "./UserBarStore";

export const SWSideBar: React.FC<{ view: View }> = React.memo(
    ({ view }) => {
        const isVisible = userBarStore.isVisible;
        const destination: Destination[] = userBarStore.destinations;

        const navLinks: NavigationComponent[] = destination.map(
            (item) => NavigationLink(item.path, Text(item.title))
        );

        // Constructing the UserFlowBar layout
        const appBarLayout = VStack({alignment: "space-around"})(
            ...navLinks
        )
            .frame({ width: "20vw", height: "100%" })
            .setClassName(["glassBar"])
            .foregroundStyle(Color.navy)
            .render();

        return (
            <div style={view.style}  {...view.events}>
                {appBarLayout}
            </div>
        );
    }
);