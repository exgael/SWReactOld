import View from "../../SWTypes/View";
import topBarStore from "../../SWTemplates/SWTabView/SWBars/Phone/TopBar/TopBarStore";

// Text Modifiers SWTypes
export type SetTrailingView<T>  = (item: View) => T;
export type SetLeadingView<T> = (item: View) => T;
export type SetNavigationTitle<T> = (title: string) => T;
export type SetVisible<T> = (isVisible: boolean) => T;
export type SetBackButtonHidden<T> = (isHidden: boolean) => T;
export type SetLargeTitle<T> = (useLargeTitle: boolean) => T;

// Text Modifiers Interface
export interface AppBarModifiers<T = any> {
    setTrailingView: SetTrailingView<T>;
    setNavigationTitle: SetNavigationTitle<T>;
    setLeadingView: SetLeadingView<T>;
    setVisible: SetVisible<T>;
    setBackButtonHidden: SetBackButtonHidden<T>;
    setLargeTitle: SetLargeTitle<T>;
}

export const appbarModifiers = {
    setNavigationTitle: function<T extends View>(this: T, title: string): T {
        topBarStore.setTitle(title);
        return this;
    },

    setVisible: function<T extends View>(this: T, isVisible: boolean): T {
        topBarStore.setVisible(isVisible);
        return this;
    },

    setTrailingView: function<T extends View>(this: T, item: View): T {
        topBarStore.setTrailingItems(item);
        return this;
    },

    setLeadingView: function<T extends View>(this: T, item: View): T {
        topBarStore.setLeadingItems(item);
        return this;
    },

    setBackButtonHidden: function<T extends View>(this: T, isHidden: boolean): T {
        topBarStore.setBackButtonHidden(isHidden);
        return this;
    },

    setLargeTitle: function<T extends View>(this: T, useLargeTitle: boolean): T {
        topBarStore.setLargeTitle(useLargeTitle);
        return this;
    },
}
