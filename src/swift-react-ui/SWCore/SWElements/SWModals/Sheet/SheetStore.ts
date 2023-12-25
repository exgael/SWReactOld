import {makeAutoObservable} from "mobx";
import {View} from "../../../SWTypes";

class Sheet {
    isPresented = false;
    view?: View = undefined;
    onDismiss?: () => void = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    show = (view: View, onDismiss?: () => void) => {
        this.view = view;
        this.onDismiss = onDismiss;
        this.isPresented = true;
    }

    hide = () => {
        this.isPresented = false;
        this.onDismiss?.();
    }
}

export const sheet: Sheet = new Sheet();
