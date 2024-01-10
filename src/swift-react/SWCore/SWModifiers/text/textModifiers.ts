// textModifiers.ts

import View from "../../SWTypes/View";

type FontSize = string;
type ClampedFontSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
type FontWeight = string | number;
type TextAlign = 'left' | 'right' | 'center' | 'justify';
type FontStyle = 'normal' | 'italic' | 'oblique';
type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through';

// Text Modifiers SWTypes
export type FontSizeModifier<T> = (size: FontSize) => T;
export type ClampedFontSizeModifier<T> = (min: FontSize, preferred: FontSize, max: FontSize) => T;
export type FontWeightModifier<T> = (weight: FontWeight) => T;
export type TextAlignModifier<T> = (alignment: TextAlign) => T;
export type FontStyleModifier<T> = (style: FontStyle) => T;
export type TextDecorationModifier<T> = (decoration: TextDecoration) => T;

// Text Modifiers Interface
export interface TextModifiers<T = any> {
    fontSize: FontSizeModifier<T>;
    clampedFontSize: ClampedFontSizeModifier<T>;
    fontWeight: FontWeightModifier<T>;
    textAlign: TextAlignModifier<T>;
    fontStyle: FontStyleModifier<T>;
    textDecoration: TextDecorationModifier<T>;
}

// Text Modifiers
export const textModifiers = {
    fontSize: function <T extends View>(this: T, size: string): T {
        this.style.fontSize = size;
        return this;
    },
    clampedFontSize: function <T extends View>(this: T, min: string, preferred: string, max: string): T {
        this.style.fontSize = `clamp(${min}, ${preferred}, ${max})`;
        return this;
    },
    fontWeight: function <T extends View>(this: T, weight: FontWeight): T {
        this.style.fontWeight = weight;
        return this;
    },
    textAlign: function <T extends View>(this: T, alignment: TextAlign): T {
        this.style.textAlign = alignment;
        return this;
    },
    fontStyle: function <T extends View>(this: T, style: FontStyle): T {
        this.style.fontStyle = style;
        return this;
    },
    textDecoration: function <T extends View>(this: T, decoration: TextDecoration): T {
        this.style.textDecoration = decoration;
        return this;
    }
};
