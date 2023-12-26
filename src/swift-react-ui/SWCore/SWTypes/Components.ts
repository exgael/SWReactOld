import View from "./View";
import {TextModifiers} from "../SWModifiers/text/textModifiers";
import {CoreModifiers} from "../SWModifiers/core/coreModifers";
import {LayoutModifiers} from "../SWModifiers/layout/layoutModifiers";
import {AbsoluteModifiers} from "../SWModifiers/absolutePositionning/absoluteModifier";
import {AppBarModifiers} from "../SWModifiers/appbar/appbarModifiers";

export type BarComponent = View
    // Base Modifiers
    & CoreModifiers<BarComponent>
    & AbsoluteModifiers<TextComponent>
    


export type TextComponent = View
    // Base Modifiers
    & CoreModifiers<TextComponent>
    & AppBarModifiers<TextComponent>
    & AbsoluteModifiers<TextComponent>

    // Text Modifiers
    & TextModifiers<TextComponent>

    // Text Properties
    & {
    text: string;
};

export type NavigationComponent = View
    // Base Modifiers
    & CoreModifiers<TextComponent>
    & AppBarModifiers<TextComponent>
    & AbsoluteModifiers<TextComponent>

    // Text Modifiers
    & TextModifiers<TextComponent>

    // Navigation Properties
    & {
    destination: string;
    label: View;
};

export type ButtonComponent = View
    // Base Modifiers
    & CoreModifiers<ButtonComponent>
    & AppBarModifiers<ButtonComponent>
    & AbsoluteModifiers<ButtonComponent>

    // Button Properties
    & {
    action: () => void;
    label: View;
};

export type ModalComponent = View
    & CoreModifiers<ButtonComponent>
    & {
    show: View;
    isPresented: boolean;
    onClose: () => void;
};

export type FullscreenCoverComponent = View & {
    show: View;
}

export type SheetComponent = ModalComponent & {
    height: string;
}

export type AlertComponent = ModalComponent & {
    title: string;
    message: string;
    button: ButtonComponent[]; // Ok, Cancel, etc.
}

export type StackComponent = View
    // Base Modifiers
    & CoreModifiers<StackComponent>
    & AppBarModifiers<StackComponent>
    & AbsoluteModifiers<StackComponent>

    // Layout Modifiers
    & LayoutModifiers<StackComponent>

    // Stack Properties
    & {
    children?: View[];
}

export type ScreenComponent = View
    // Base Modifiers
    & CoreModifiers<ScreenComponent>
    & AppBarModifiers<ScreenComponent>
    & AbsoluteModifiers<TextComponent>

    // Layout Modifiers
    & LayoutModifiers<ScreenComponent>

    // Screen Properties
    & {

    children?: any[];
}

export type ForEachComponent = View
    // Base Modifiers
    & CoreModifiers<ForEachComponent>
    & AppBarModifiers<ForEachComponent>
    & AbsoluteModifiers<TextComponent>

    // Layout Modifiers
    & LayoutModifiers<ForEachComponent>
    & {
    data: any[];
    viewBuilder: (item: any, index: number) => View;
}

export type SpacerComponent = View
    & {
    size?: string;
};

export type ShapeComponent = View
    // Base Modifiers
    & CoreModifiers<ShapeComponent>
    & AppBarModifiers<ShapeComponent>
    & AbsoluteModifiers<TextComponent>
    & {
};