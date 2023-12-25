import { makeAutoObservable } from 'mobx';
import {View} from "../../../SWTypes";

class FullscreenCover {
    isPresented: boolean = false;
    view?: View = undefined;
    onDismiss?: () => void = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    show = ( view: View, onDismiss?: ()=> void ): void => {
        this.view = view;
        this.onDismiss = onDismiss;
        this.isPresented = true;
    }

    hide = (): void => {
        this.isPresented = false;
        this.onDismiss?.();
    }
}

export const fullscreenCover: FullscreenCover = new FullscreenCover();
