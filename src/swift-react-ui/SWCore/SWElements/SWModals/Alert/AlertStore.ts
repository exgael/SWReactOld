import {makeAutoObservable} from "mobx";

class Alert {
    isPresented = false;
    title = '';
    message = '';
    onDismiss?: () => void = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    show = (title: string, message: string, onDismiss?: () => void) => {
        this.title = title;
        this.message = message;
        this.onDismiss = onDismiss;
        this.isPresented = true;
    }

    hide = () => {
        this.isPresented = false;
        this.onDismiss?.();
    }
}

export const alert: Alert = new Alert();
