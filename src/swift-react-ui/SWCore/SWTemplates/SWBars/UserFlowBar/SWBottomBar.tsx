import React from "react";
import {HStack, NavigationLink, RoundedRectangle, Text, ZStack} from "../../../../components";
import {Color, View} from "../../../SWTypes";
import {NavigationComponent} from "../../../SWTypes/Components";
import {Destination} from "../../../SWProvider/useNavigate";
import userBarStore from "./UserBarStore";

export const SWBottomBar: React.FC<{ view: View }> = React.memo(
    ({ view }) => {
        const destination: Destination[] = userBarStore.destinations;

        const navLinks: NavigationComponent[] = destination.map(
            (item) => NavigationLink(item.path,  Text(item.title))
        );

        // Constructing the UserFlowBar layout
        const appBarLayout = HStack({ alignment: "space-around" })(
                ...navLinks
        )
            .setClassName(["glass", "bottom-bar"])
            .render();

        return (
            <div style={view.style}  {...view.events}>
                {appBarLayout}
            </div>
        );
    }
);