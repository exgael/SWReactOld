import { makeAutoObservable } from "mobx";
import {Destination} from "../../../SWProvider/Navigation";

class UserBarStore {
    isVisible: boolean = true;
    destinations: Destination[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setVisible(visible: boolean) {
        this.isVisible = visible;
    }

    setDestinations(destinations: Destination[]) {
        this.destinations = destinations;
    }
}

const userBarStore = new UserBarStore();
export default userBarStore;
