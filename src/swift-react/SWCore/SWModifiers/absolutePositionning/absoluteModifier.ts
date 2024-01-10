import View from "../../SWTypes/View";
import {evaluate, MaybeFunction} from "../core/coreModifers";

// Extend native SWTypes
type SWLength = MaybeFunction<string>;

// Inner View Modifier Types
export type AbsolutePositionModifier<T> = (x: SWLength, y: SWLength) => T;

export interface AbsoluteModifiers<T = any> {
    absolutePosition: AbsolutePositionModifier<T>;
    absoluteCenter: () => T;
    positionFixedTop: () => T; // For UserFlowBar and NavigationBar
    positionFixedBottom: () => T; // For BottomBar
    positionFixedSide: (side: 'left' | 'right') => T; // For SideBar
    positionFixedTrailingTopBar: () => T; // For SideBar
}

// Implementing the modifiers
export const absoluteModifiers = {

    positionFixedTrailingTopBar: function <T extends View>(this: T): T {
        this.style.position = 'absolute';
        this.style.top = '0';
        this.style.right = '5%';
        this.style.zIndex = '999';
        return this;
    },

    absolutePosition: function <T extends View>(this: T, x: SWLength, y: SWLength): T {
        const xPos = evaluate(x);
        const yPos = evaluate(y);
        this.style.position = 'absolute';
        this.style.left = xPos;
        this.style.top = yPos;
        return this;
    },

    absoluteCenter: function <T extends View>(this: T): T {
        this.style.position = 'absolute';
        this.style.left = '50%';
        this.style.top = '50%';
        this.style.transform = 'translate(-50%, -50%)';
        return this;
    },

    // Modifier for UserFlowBar and NavigationBar
    positionFixedTop: function <T extends View>(this: T): T {
        this.style.position = 'fixed';
        this.style.top = '0';
        this.style.left = '0';
        this.style.right = '0';
        this.style.zIndex = '999';
        this.style.transform = 'translate(0, 10)';
        return this;
    },


    // Modifier for BottomBar
    positionFixedBottom: function <T extends View>(this: T): T {
        this.style.position = 'fixed';
        this.style.bottom = '0%';
        this.style.left = '0%';
        //  this.style.transform = 'translate(-50%)';
        this.style.right = '0';
        this.style.zIndex = '999';

        // TODO : Fix this to use auto instead of 17.5%

        //     this.style.marginLeft = 'auto';
        //     this.style.marginRight = 'auto';
        return this;
    },

    // Modifier for SideBar
    positionFixedSide: function <T extends View>(this: T, side: 'left' | 'right'): T {
        this.style.position = 'fixed';
        this.style[side] = '0';
        this.style.top = '0';
        this.style.bottom = '0';
        this.style.zIndex = '999';
        return this;
    },
};
