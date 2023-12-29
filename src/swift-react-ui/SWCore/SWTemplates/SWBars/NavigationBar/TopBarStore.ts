import { makeAutoObservable } from "mobx";
import { View } from "../../../SWTypes";

class TopBarStore {
    title = 'Default Title';
    isVisible = true;
    isBackButtonHidden = false;
    leadingItems?: View;
    trailingItems?: View;
    largeTitle = false;

    constructor() {
        makeAutoObservable(this);
    }

    setTitle(newTitle: string) {
        this.title = newTitle;
    }

    setVisible(visible: boolean) {
        this.isVisible = visible;
    }

    setBackButtonHidden(hidden: boolean) {
        this.isBackButtonHidden = hidden;
    }

    setLeadingItems(items?: View) {
        this.leadingItems = items;
    }

    setTrailingItems(items?: View) {
        this.trailingItems = items;
    }

    setLargeTitle(large: boolean) {
        this.largeTitle = large;
    }
}

const topBarStore = new TopBarStore();
export default topBarStore;
