import React from "react";
import {HStack, NavigationLink, Text} from "../../../../components";
import {Color, View} from "../../../SWTypes";
import {NavigationComponent} from "../../../SWTypes/Components";
import {Destination} from "../../../SWProvider/useNavigate";
import userBarStore from "./UserBarStore";
export const SWAppBar: React.FC<{ view: View }> = React.memo(
    ({ view }) => {
        const isVisible = userBarStore.isVisible;
        const destination: Destination[] = userBarStore.destinations;
        const navLinks: NavigationComponent[] = destination.map(
            (item: Destination) => NavigationLink(item.path, Text(item.title))
        );

        // Constructing the UserFlowBar layout
        const appBarLayout = HStack({alignment:"space-around"})(
            ...navLinks
        )
            .frame({ width: "100%", height: "65px" })
            .setClassName(["glass"])
            .foregroundStyle(Color.black)
            .render();

        return (
            <div style={view.style}  {...view.events}>
                {appBarLayout}
            </div>
        );
    }
);