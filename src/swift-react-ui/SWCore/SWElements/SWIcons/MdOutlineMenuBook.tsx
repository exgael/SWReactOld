import { MdOutlineMenuBook } from "react-icons/md";
import React, {useEffect} from "react";
import {ButtonComponent} from "../../SWTypes/Components";
import {useNavigate} from "../../SWProvider/useNavigate";
import routingManager from "../SWNavigation/RoutingManager";

export const SWMdOutlineMenuBook: React.FC<{ view: ButtonComponent }> = React.memo(
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
                <MdOutlineMenuBook/>
            </div>
        )
    }
);