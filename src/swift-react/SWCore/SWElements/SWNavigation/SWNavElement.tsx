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
                push(view.destination, view.title);
            } }>
                {view.label.toJSX()}
            </span>
        );
    }
);

export const SWChevronBack: React.FC<{ view: ButtonComponent }> = React.memo(
    ({view}) => {
        return (
            <div style={view.style} {...view.events} onClick={view.action}>
                <IoChevronBack/>
            </div>
        )
    }
);
