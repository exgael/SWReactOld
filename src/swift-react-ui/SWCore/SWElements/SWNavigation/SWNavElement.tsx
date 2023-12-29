import React, {useEffect} from "react";
import {ButtonComponent, NavigationComponent} from "../../SWTypes/Components";
import {useNavigate} from "../../SWProvider/useNavigate";
import {IoChevronBack} from "react-icons/io5";
import routingManager from "./RoutingManager";

export const SWNavigationLink: React.FC<{ view: NavigationComponent }> = React.memo(
    ({view}) => {
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

        return (
            <span style={view.style} {...view.events} onClick={() => {
                routingManager.navigateTo(view.destination);
            } }>
                {view.label.render()}
            </span>
        );
    }
);

export const SWChevronBack: React.FC<{ view: ButtonComponent }> = React.memo(
    ({view}) => {

        const { goBack } = useNavigate();

        useEffect(() => {
            // Set up a listener for route changes
            routingManager.onRouteChange = (route: string): void => {
                goBack();
            };

            return () => {
                routingManager.onRouteChange = () => {};
            };
        }, []);

        return (
            <div style={view.style} {...view.events} onClick={view.action}>
                <IoChevronBack/>
            </div>
        )
    }
);
