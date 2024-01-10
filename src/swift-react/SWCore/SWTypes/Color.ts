// Color.ts

import {MaybeFunction} from "../SWModifiers/core/coreModifers";


const shouldUseDark = () => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour <= 6;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark || isNight;
}

export interface ThemeColors {
    background: string;
    primaryText: string;
    secondaryText: string;
    accent: string;
    divider: string;
}

const lightThemeColors: ThemeColors = {
    background: '#FFFFFF', // White
    primaryText: '#000000', // Black
    secondaryText:'#3C3C43', // Dark gray
    accent: '#007AFF', // Blue
    divider: '#C6C6C8', // Light gray
};

const darkThemeColors: ThemeColors = {
    background: '#1C1C1E', // Almost black
    primaryText: '#FFFFFF', // White
    secondaryText: '#EBEBF5', // Light gray
    accent: '#0A84FF', // Bright blue
    divider: '#48484A', // Dark gray
};

/**
 * Represents a color.
 * @example Color.red
 * @example Color.blue.opacity(0.5)
 */
export class Color {
    private readonly value: string;

    constructor(value: string) {
        this.value = value;
    }

    // Theme colors
    static background = new Color(shouldUseDark() ? darkThemeColors.background : lightThemeColors.background);
    static primaryText = new Color(shouldUseDark() ? darkThemeColors.primaryText : lightThemeColors.primaryText);
    static secondaryText = new Color(shouldUseDark() ? darkThemeColors.secondaryText : lightThemeColors.secondaryText);
    static accent = new Color(shouldUseDark() ? darkThemeColors.accent : lightThemeColors.accent);
    static divider = new Color(shouldUseDark() ? darkThemeColors.divider : lightThemeColors.divider);

    // Basic colors
    static black = new Color('#000000');
    static silver = new Color('#c0c0c0');
    static grey = new Color('#808080');
    static white = new Color('#ffffff');
    static maroon = new Color('#800000');
    static red = new Color('#ff0000');
    static purple = new Color('#800080');
    static fuchsia = new Color('#ff00ff');
    static green = new Color('#00ff00');
    static lime = new Color('#00ff00');
    static olive = new Color('#808000');
    static yellow = new Color('#ffff00');
    static navy = new Color('#000080');
    static blue = new Color('#0000ff');
    static teal = new Color('#008080');
    static aqua = new Color('#00ffff');

    // Extended colors
    static orange = new Color('#ffa500');
    static aliceblue = new Color('#f0f8ff');
    static antiquewhite = new Color('#faebd7');
    static aquamarine = new Color('#7fffd4');

    // Clear colors
    static clear = new Color('transparent');

    static hex(hexValue: string): Color {
        if (!/^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue)) {
            throw new Error('Invalid hex value');
        }
        return new Color(hexValue);
    }

    static rgb(r: number, g: number, b: number): Color {
        return new Color(`rgb(${r}, ${g}, ${b})`);
    }

    static rgba(r: number, g: number, b: number, a: number): Color {
        return new Color(`rgba(${r}, ${g}, ${b}, ${a})`);
    }

    opacity(value: number): Color {
        // Ensure value is between 0 and 1
        if (value < 0) value = 0;
        if (value > 1) value = 1;

        // Handle RGBA format
        const rgbaMatch = this.value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);
        if (rgbaMatch) {
            return Color.rgba(
                parseInt(rgbaMatch[1], 10),
                parseInt(rgbaMatch[2], 10),
                parseInt(rgbaMatch[3], 10),
                value
            );
        }

        // Handle HEX format
        const hexMatch = this.value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
        if (hexMatch) {
            const hex = hexMatch[1];
            if (hex.length === 3) {
                const r = hex.charAt(0) + hex.charAt(0);
                const g = hex.charAt(1) + hex.charAt(1);
                const b = hex.charAt(2) + hex.charAt(2);
                const a = Math.round(value * 255).toString(16).padStart(2, '0');
                return new Color(`#${r}${g}${b}${a}`);
            } else {
                const a = Math.round(value * 255).toString(16).padStart(2, '0');
                return new Color(`#${hex}${a}`);
            }
        }

        // Handle RGB format
        const rgbMatch = this.value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            return Color.rgba(
                parseInt(rgbMatch[1], 10),
                parseInt(rgbMatch[2], 10),
                parseInt(rgbMatch[3], 10),
                value
            );
        }

        // If the color format is not recognized, return the original color
        return this;
    }

    toString(): string {
        return this.value;
    }

    static random(): Color {
        const val = Math.random()
        if (val > 0.5) {
            return Color.olive
        } else {
            return Color.aliceblue
        }
    }
}

// Gradient.ts
export type GradientDirection = 'leading' | 'trailing' | 'top' | 'bottom';
export type GradientType = 'linear' | 'radial';

export class Gradient {
    private colors: Color[];
    private readonly direction: GradientDirection;
    private readonly type: GradientType;

    constructor(colors: Color[], direction: GradientDirection, type: GradientType = 'linear') {
        this.colors = colors;
        this.direction = direction;
        this.type = type;
    }

    toString(): string {
        const directionMap: Record<GradientDirection, string> = {
            leading: 'to right',
            trailing: 'to left',
            top: 'to top',
            bottom: 'to bottom',
        };

        const colorValues = this.colors.map(color => color.toString()).join(', ');

        if (this.type === 'linear') {
            return `linear-gradient(${directionMap[this.direction]}, ${colorValues})`;
        } else {
            return `radial-gradient(${colorValues})`;
        }
    }
}




// Prime Color Type
export type SWColor = MaybeFunction<Color> | MaybeFunction<Gradient>;

// Utility functions
export const LinearGradient = (colors: Color[], startPoint: GradientDirection): Gradient => new Gradient(colors, startPoint, 'linear');
export const RadialGradient = (colors: Color[]): Gradient => new Gradient(colors, 'top', 'radial');

// Usage:
// const bgColor = linearGradient([Color.red.opacity(0.5), Color.blue], 'leading');