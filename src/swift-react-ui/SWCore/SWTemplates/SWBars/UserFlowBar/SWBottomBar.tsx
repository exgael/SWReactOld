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
            .frame({ width: "95vw", height: "80px" })
            .foregroundStyle(Color.white)
            .background(Color.rgba(150, 150, 150, 0.5))
            // .background(Color.hex("#333"))
            .setClassName(["glass"])
            .mask(
                RoundedRectangle("35px")
                    .frame({width: "100%", height: "100%"})
            )
            .render();

        return (
            <div style={view.style}  {...view.events}>
                {appBarLayout}
            </div>
        );
    }
);