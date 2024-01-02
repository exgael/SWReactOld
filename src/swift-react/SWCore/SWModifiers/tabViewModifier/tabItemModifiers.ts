// textModifiers.ts

import View from "../../SWTypes/View";
import {IconType} from "react-icons";
import {TabItemComponent} from "../../SWTemplates/SWTabView/SWTabView";

type Icon = IconType;

// Text Modifiers SWTypes
export type SetTitleModifier  = (title: string) => TabItemComponent;
export type SetIconModifier  = (icon: Icon, iconActive: Icon) => TabItemComponent;
export type SetKeyModifier  = (key: string) => TabItemComponent;

// Text Modifiers Interface
export interface TabItemModifiers {
    setTitle: SetTitleModifier;
    setIcon: SetIconModifier;
    setKey: SetKeyModifier;
}

// Text Modifiers
export const tabItemModifiers = {
    setTitle: function(this: TabItemComponent, title: string): TabItemComponent {
        this.title = title;
        this.key = title;
        return this;
    },
    setIcon: function(this: TabItemComponent, icon: Icon, iconActive: Icon): TabItemComponent {
        this.icon = icon;
        this.iconActive = iconActive;
        return this;
    },
    setKey: function(this: TabItemComponent, key: string): TabItemComponent {
        this.key = key;
        return this;
    }
};
