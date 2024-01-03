import View from "../SWTypes/View";
import {coreModifiers} from "../SWModifiers/core/coreModifers";
import {absoluteModifiers} from "../SWModifiers/absolutePositionning/absoluteModifier";
import {appbarModifiers} from "../SWModifiers/topBar/topBarModifiers";

// Assuming coreModifiers, absoluteModifiers, and appbarModifiers are static objects
const combinedModifiers = {...coreModifiers, ...absoluteModifiers, ...appbarModifiers};

const createComponent = <T extends View>(toJSX: Partial<View>, overrides: Partial<T>, ...modifiers: any[]): T => {
    const component = {} as T;

    // Apply 'toJSX' and 'overrides'
    Object.assign(component, toJSX, overrides);

    // Apply 'style' and 'events' with empty objects as defaults
    component.style = component.style || {};
    component.events = component.events || {};

    // Apply combined static modifiers
    Object.assign(component, combinedModifiers);

    // Apply additional dynamic modifiers efficiently
    for (const modifier of modifiers) {
        if (typeof modifier === 'function') {
            // If modifier is a function, call it lazily
            Object.assign(component, modifier(component));
        } else {
            // If modifier is an object, assign it directly
            Object.assign(component, modifier);
        }
    }

    return component;
};


export default createComponent;