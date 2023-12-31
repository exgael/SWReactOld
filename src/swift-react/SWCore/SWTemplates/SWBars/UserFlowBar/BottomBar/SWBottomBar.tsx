import React, {useEffect} from "react";
import {HStack} from "../../../../../components";
import {Color, View} from "../../../../SWTypes";
import {Destination, useNavigate} from "../../../../SWProvider/useNavigate";
import userBarStore from "../UserBarStore";
import {BottomBarItem} from "./SWBottomBarItem";
import {SWView} from "../../../../SWElements/SWElements";
import {useLocation} from "react-router-dom";
import routingManager from "../../../../SWElements/SWNavigation/RoutingManager";

export const SWBottomBar: React.FC<{ view: View }> = React.memo(
    ({ view }) => {
        const destinations: Destination[] = userBarStore.destinations;
        const { pathname } = useLocation()
        const { navigate } = useNavigate();

        useEffect(() => {
            // Set up a listener for route changes
            routingManager.onRouteChange = (route: string): void => {
                navigate(route);
            };

            return () => {
                routingManager.onRouteChange = () => {};
            };
        }, [navigate]);

        const items= destinations.map(
            (destination) => {

                // If the current path matches the path of the item, we want to highlight it
                const isHighlighted = pathname === destination.path;

                return BottomBarItem(destination.title, destination.path, destination.icon)
                    // Frame width is screen width divided by number of items
                    // For equal distribution of items
                    .frame({width: `${100 / destinations.length}vw`, height: "100%"})

                    // Padding bottom to move the items up a bit
                    .padding({bottom: "2vh"})

                    // Setting the background color of the item
                    .foregroundStyle(isHighlighted ? Color.olive : Color.grey)

                    .onClick(() => {
                        // Navigate to the path of the item
                        routingManager.navigateTo(destination.path);
                    })
            });

        // Constructing the BottomBar layout
        const bottomBarLayout = HStack({ alignment: "space-between" })(
                ...items
        )
            .setClassName(["glass", "bottom-bar"])
            .crossAxisAlignment("center")

        return (
            <SWView view={view}>
                {bottomBarLayout.render()}
            </SWView>
        );
    }
);