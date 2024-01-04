import React, {RefObject} from "react";

export type View = {
    style: Record<string, any>;
    events: {
        onClick?: () => void;
        onMouseEnter?: () => void;
        onMouseLeave?: () => void;
        onTouchStart?: (event: any) => void;
        onTouchEnd?: (event: any) => void;
        touchMove?: (event: any) => void;
        drop?: (event: any) => void;
        dragStart?: (event: any) => void;
        dragOver?: (event: any) => void;
    };
    properties: Record<string, any>;

    background?: View;

    id?: string
    key?: string

    toJSX: () => React.ReactElement;
    ariaLabel?: string;
    ariaRole?: string;
    type?: any;
    ref?: RefObject<HTMLDivElement>;
    classNames?: string[];
};

export default View


