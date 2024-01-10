// layoutModifiers.ts

import View from "../../SWTypes/View";

type direction = 'row' | 'column';
/**
 * Specifies how to align children along the cross axis of their container.
 */
type justifyContent =
/** Items are packed toward the start of the flex direction. */
    | "flex-start"
    /** Items are packed toward the end of the flex direction. */
    | "flex-end"
    /** Items are centered along the line. */
    | "center"
    /** Items are evenly distributed in the line. */
    | "space-between"
    /** Items are evenly distributed in the line with equal space around them. */
    | "space-around";

type alignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

export type FlexModifier<T> = (direction: direction) => T;
export type MainAxisAlignmentModifier<T> = (alignment: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around') => T;
export type CrossAxisAlignmentModifier<T> = (alignment: alignItems) => T;
export type Gap<T> = (gab: string) => T
export type Expend<T> = () => T

export interface LayoutModifiers<T = any> {
    flex: FlexModifier<T>;
    mainAxisAlignment: MainAxisAlignmentModifier<T>;
    crossAxisAlignment: CrossAxisAlignmentModifier<T>;
    gap: Gap<T>;
    expend: Expend<T>;
}

export const layoutModifiers = {
    flex: function <T extends View>(this: T, direction: direction): T {
        if (this.style.display === 'flex' && this.style.flexDirection === direction) {
            // console.warn("Redundant flex modifier: The component already has the same flex direction.");
            return this;
        }
        this.style.display = 'flex';
        this.style.flexDirection = direction;
        return this;
    },

    mainAxisAlignment: function <T extends View>(this: T, alignment: justifyContent): T {
        if (this.style.display !== 'flex') {
            //  console.warn("Ineffective justifyContent modifier: The component is not a flex container.");
            return this;
        }
        if (this.style.justifyContent === alignment) {
            //  console.warn("Redundant justifyContent modifier: The component already has the same alignment.");
            return this;
        }
        this.style.justifyContent = alignment;
        return this;
    },

    crossAxisAlignment: function <T extends View>(this: T, alignment: alignItems): T {
        if (this.style.display !== 'flex') {
            // console.warn("Ineffective alignItems modifier: The component is not a flex container.");
            return this;
        }
        if (this.style.alignItems === alignment) {
            console.warn("Redundant alignItems modifier: The component already has the same alignment.");
            return this;
        }
        this.style.alignItems = alignment;
        return this;
    },

    gap: function <T extends View>(this: T, gap: string): T {
        this.style.gap = gap;
        return this;
    },

    expend: function <T extends View>(this: T): T {
        this.style.flexGros = 1;
        return this;
    }
};

