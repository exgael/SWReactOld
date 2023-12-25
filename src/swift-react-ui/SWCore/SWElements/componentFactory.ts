import View from "../SWTypes/View";
import {coreModifiers} from "../SWModifiers/core/coreModifers";
import {absoluteModifiers} from "../SWModifiers/absolutePositionning/absoluteModifier";
import {appbarModifiers} from "../SWModifiers/appbar/appbarModifiers";

const createComponent = <T extends View>(render: Partial<View>, overrides: Partial<T>, ...modifiers: any[]): T => {

    return {
        style: {},
        events: {},
        ...render,
        ...overrides,
        ...coreModifiers,
        ...absoluteModifiers,
        ...appbarModifiers,
        ...Object.assign({}, ...modifiers),
    } as T;
};

export default createComponent;