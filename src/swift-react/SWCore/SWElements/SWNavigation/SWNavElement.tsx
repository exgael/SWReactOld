import React from "react";
import {ButtonComponent, NavigationLinkComponent} from "../../SWTypes/Components";
import {IoChevronBack} from "react-icons/io5";
import {useNavigationStack} from "../../SWProvider/NavigationStack/NavigationStackContext";
import {useTheme} from "../../SWProvider/useTheme";

export const SWNavigationLink: React.FC<{ view: NavigationLinkComponent }> = React.memo(
    ({view}) => {
        const {push} = useNavigationStack();

        return (
            <span style={view.style} {...view.events} onClick={() => {
                push(view.destination, view.title);
            }}>
                {view.label.toJSX()}
            </span>
        );
    }
);

export const SWChevronBack: React.FC<{ view: ButtonComponent }> = React.memo(
    ({view}) => {

        view.style.color = useTheme().themeColors.accent;

        return (
            <div style={view.style} {...view.events} onClick={view.action}>
                <IoChevronBack/>
            </div>
        )
    }
);
