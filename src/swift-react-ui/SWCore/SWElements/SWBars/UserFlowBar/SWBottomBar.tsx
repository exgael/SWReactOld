import React from "react";
import {HStack, NavigationLink, Text, ZStack} from "../../../../components";
import {Color, View} from "../../../SWTypes";
import {NavigationComponent} from "../../../SWTypes/Components";
import {Destination} from "../../../SWProvider/Navigation";
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
            .frame({ width: "100%", height: "80px" })
            .background(Color.hex("#333"))
            .foregroundStyle(Color.white)
            .opacity(0.9)
            .render();

        return (
            <div style={view.style}  {...view.events}>
                {appBarLayout}
            </div>
        );
    }
);