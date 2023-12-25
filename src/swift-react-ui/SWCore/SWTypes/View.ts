import React, {RefObject} from "react";

export type View = {
    style: Record<string, any>;
    events: {
        onClick?: () => void;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
        touchStart?: (event: any) => void;
        touchEnd?: (event: any) => void;
        touchMove?: (event: any) => void;
        drop?: (event: any) => void;
        dragStart?: (event: any) => void;
        dragOver?: (event: any) => void;
    };
    properties: Record<string, any>;

    render: () => React.ReactElement;
    ariaLabel?: string;
    ariaRole?: string;
    type?: any;
    ref?: RefObject<HTMLElement>;
    classNames?: string[];
};

export default View


