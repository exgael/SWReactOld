import View from "../SWTypes/View";
import {coreModifiers} from "../SWModifiers/core/coreModifers";
import {absoluteModifiers} from "../SWModifiers/absolutePositionning/absoluteModifier";
import {appbarModifiers} from "../SWModifiers/topBar/topBarModifiers";

const createComponent = <T extends View>(toJSX: Partial<View>, overrides: Partial<T>, ...modifiers: any[]): T => {

    return {
        style: {},
        events: {},
        ...toJSX,
        ...overrides,
        ...coreModifiers,
        ...absoluteModifiers,
        ...appbarModifiers,
        ...Object.assign({}, ...modifiers),
    } as T;
};

export default createComponent;