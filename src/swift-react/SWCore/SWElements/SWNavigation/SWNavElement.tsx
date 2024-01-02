import React, {useEffect} from "react";
import {ButtonComponent, NavigationLinkComponent} from "../../SWTypes/Components";
import {useNavigate} from "../../SWProvider/useNavigate";
import {IoChevronBack} from "react-icons/io5";
import routingManager from "./RoutingManager";
import {useNavigationStack} from "../../SWProvider/NavigationStack/NavigationStackContext";

export const SWNavigationLink: React.FC<{ view: NavigationLinkComponent }> = React.memo(
    ({view}) => {
        const { push } = useNavigationStack();

        return (
            <span style={view.style} {...view.events} onClick={() => {
                push(view.destination);
            } }>
                {view.label.toJSX()}
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
