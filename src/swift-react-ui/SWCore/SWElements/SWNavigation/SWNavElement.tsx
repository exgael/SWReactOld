import React, {useEffect} from "react";
import {ButtonComponent, NavigationComponent} from "../../SWTypes/Components";
import {useNavigate} from "../../SWProvider/Navigation";
import {IoChevronBack} from "react-icons/io5";


class RoutingManager {
    // Holds the current route
    currentRoute = '/';

    // Method to navigate to a new route
    navigateTo(route: string) {
        this.currentRoute = route;
        this.onRouteChange(this.currentRoute);
    }

    // Callback when route changes
    onRouteChange = (route: string) => {
        // To be implemented in the React component
    };
}

const routingManager: RoutingManager = new RoutingManager();

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
