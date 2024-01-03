import View from "./View";
import {TextModifiers} from "../SWModifiers/text/textModifiers";
import {CoreModifiers} from "../SWModifiers/core/coreModifers";
import {LayoutModifiers} from "../SWModifiers/layout/layoutModifiers";
import {AbsoluteModifiers} from "../SWModifiers/absolutePositionning/absoluteModifier";
import {TopBarModifiers} from "../SWModifiers/topBar/topBarModifiers";

export type BarComponent = View
    // Base Modifiers
    & CoreModifiers<BarComponent>
    & AbsoluteModifiers<TextComponent>
    


export type TextComponent = View
    // Base Modifiers
    & CoreModifiers<TextComponent>
    & TopBarModifiers<TextComponent>
    & AbsoluteModifiers<TextComponent>

    // Text Modifiers
    & TextModifiers<TextComponent>

    // Text Properties
    & {
    text: string;
};

export type NavigationLinkComponent = View
    // Base Modifiers
    & CoreModifiers<NavigationLinkComponent>
    & TopBarModifiers<NavigationLinkComponent>
    & AbsoluteModifiers<NavigationLinkComponent>

    // Text Modifiers
    & TextModifiers<NavigationLinkComponent>

    // Navigation Properties
    & {
    label: View;
    destination: View;
    title?: string;
};

export type ButtonComponent = View
    // Base Modifiers
    & CoreModifiers<ButtonComponent>
    & TopBarModifiers<ButtonComponent>
    & AbsoluteModifiers<ButtonComponent>

    // Button Properties
    & {
    action: () => void;
    label: View;
};

export type ModalComponent = View
    & CoreModifiers<ButtonComponent>
    & {
    onDismiss: () => void;
};

export type FullscreenCoverComponent = ModalComponent & {
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
    & TopBarModifiers<StackComponent>
    & AbsoluteModifiers<StackComponent>

    // DeviceLayout Modifiers
    & LayoutModifiers<StackComponent>

    // NavigationStack Properties
    & {
    children?: View[];
}

export type ScreenComponent = View
    // Base Modifiers
    & CoreModifiers<ScreenComponent>
    & TopBarModifiers<ScreenComponent>
    & AbsoluteModifiers<TextComponent>

    // DeviceLayout Modifiers
    & LayoutModifiers<ScreenComponent>

    // Screen Properties
    & {

    children?: any[];
}

export type ForEachComponent = View
    // Base Modifiers
    & CoreModifiers<ForEachComponent>
    & TopBarModifiers<ForEachComponent>
    & AbsoluteModifiers<ForEachComponent>

    // DeviceLayout Modifiers
    & LayoutModifiers<ForEachComponent>
    & {
    data: any[];
    viewBuilder: (item: any, index: number) => View;
}

export type SpacerComponent = View
    & CoreModifiers<SpacerComponent>
    & {
    size?: string;
};











export interface Section {
    id: string;
    title: string;
    view: View;
    quickLinks: QuickLink[];
}

export interface QuickLink {
    id: string;
    headline: string;
}

export type ThreePartLayoutComponent = View
    // Base Modifiers
    & CoreModifiers<ThreePartLayoutComponent>
    & TopBarModifiers<ThreePartLayoutComponent>
    & AbsoluteModifiers<TextComponent>

    // DeviceLayout Modifiers
    & LayoutModifiers<ThreePartLayoutComponent>

    // ThreePartLayout Properties
    & {
    sections: Section[];
    quickLinks: QuickLink[];
};









export type ShapeComponent = View
    // Base Modifiers
    & CoreModifiers<ShapeComponent>
    & TopBarModifiers<ShapeComponent>
    & AbsoluteModifiers<TextComponent>
    & {
};

export type CircleComponent = View
    // Base Modifiers
    & CoreModifiers<CircleComponent>
    & TopBarModifiers<CircleComponent>
    & AbsoluteModifiers<TextComponent>
    & {
};

export type SwitchComponent = View
    // Base Modifiers
    & CoreModifiers<SwitchComponent>
    & TopBarModifiers<SwitchComponent>
    & AbsoluteModifiers<TextComponent>

    // Switch Properties
    & {
    isOn: boolean;
    onToggle: () => void;
};

export type SliderComponent = View
    // Base Modifiers
    & CoreModifiers<SliderComponent>
    & TopBarModifiers<SliderComponent>
    & AbsoluteModifiers<TextComponent>

    // Slider Properties
    & {
    value: number;
    onValueChange: (value: number) => void;
};

export type TextFieldComponent = View
    // Base Modifiers
    & CoreModifiers<TextFieldComponent>
    & TopBarModifiers<TextFieldComponent>
    & AbsoluteModifiers<TextComponent>

    // TextField Properties
    & {
    text: string;
    onTextChange: (text: string) => void;
};

export type ImageComponent = View
    // Base Modifiers
    & CoreModifiers<ImageComponent>
    & TopBarModifiers<ImageComponent>
    & AbsoluteModifiers<TextComponent>

    // Image Properties
    & {
    src: string;
};

/**
 * It is a component that can be used to display a list of items using a sidebar.
 * Each item in the list can be selected by the user.
 * And it is possible to display a detail view for the selected item.
 */
export type SwitchSideBarComponent = View
    // Base Modifiers
    & CoreModifiers<SwitchSideBarComponent>
    & TopBarModifiers<SwitchSideBarComponent>
    & AbsoluteModifiers<SwitchSideBarComponent>

    // SwitchSideBar Properties
    & {
    items: any[];
    selectedItem: any;
    onSelectItem: (item: any) => void;
    detailView: (item: any) => View;
};


/**
 * It is a component that is to display a list of items using a sidebar.
 * Each item correspond to a section in the detailView
 * And clicking on an item will scroll to the corresponding section in the detailView
 */
export type ScrollToSideBarComponent = View
    // Base Modifiers
    & CoreModifiers<ScrollToSideBarComponent>
    & TopBarModifiers<ScrollToSideBarComponent>
    & AbsoluteModifiers<ScrollToSideBarComponent>

    // SideBar Properties
    & {
    items: any[];
    detailView: (item: any) => View;
};


/**
 * Component that is to display a list of items in a scroll view.
 */
export type ScrollViewComponent = View
    // Base Modifiers
    & CoreModifiers<ScrollViewComponent>
    & TopBarModifiers<ScrollViewComponent>
    & AbsoluteModifiers<ScrollViewComponent>

    // ScrollView Properties
    & {
    children?: View[];
};

/**
 * It is a component that is to display a list of items in a carousel.
 */
export type CarouselComponent = View
    // Base Modifiers
    & CoreModifiers<CarouselComponent>
    & TopBarModifiers<CarouselComponent>
    & AbsoluteModifiers<CarouselComponent>

    // Carousel Properties
    & {
    children?: View[];
};

export type GridComponent = View
    // Base Modifiers
    & CoreModifiers<GridComponent>
    & TopBarModifiers<GridComponent>
    & AbsoluteModifiers<GridComponent>

    // Grid Properties
    & {
    children?: View[];
};

export type AnimationComponent = View
    // Base Modifiers
    & CoreModifiers<AnimationComponent>
    & TopBarModifiers<AnimationComponent>
    & AbsoluteModifiers<AnimationComponent>

    // Animation Properties
    & {
    child: View;
    initial: any;
    animate: any;
    exit: any;
    transition: any;
};

