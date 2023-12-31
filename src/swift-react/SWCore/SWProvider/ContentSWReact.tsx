import React, {ReactNode} from 'react';
import {Body, Destination, NavigationContainer} from "./useNavigate";
import {useResponsive} from "./useResponsive";
import PhoneLayout from "./DeviceLayout/PhoneLayout";
import TabletLayout from "./DeviceLayout/TabletLayout";
import DesktopLayout from "./DeviceLayout/DesktopLayout";
import userBarStore from "../SWTemplates/SWBars/UserFlowBar/UserBarStore";
import {InstallNotification} from "../../components/install_notif";
import {useObserver} from "mobx-react";
import {sheet} from "../SWElements/SWModals/Sheet/SheetStore";
import {alert} from "../SWElements/SWModals/Alert/AlertStore";
import {Alert} from "../../components/modals/Alert";

interface ContentProps {
    destinations: Destination[];
}

/**
 * React-SW Bridge
 * @param children
 * @param destinations
 * @constructor
 */

export const ContentSWReact: React.FC<ContentProps> = ({ destinations }) => {

    let contentComponent: ReactNode;
    userBarStore.setDestinations(destinations);
    const children = <Body destinations={destinations} />;

    const { width, orientation } = useResponsive();

    // Define breakpoints and render components accordingly
    if (width < 576) {
        contentComponent = <PhoneLayout orientation={orientation}>{children}</PhoneLayout>;
    } else if (width >= 576 && width < 992) {
        contentComponent = <TabletLayout orientation={orientation}>{children}</TabletLayout>;
    } else {
        contentComponent = <DesktopLayout>{children}</DesktopLayout>;
    }

    return (
        <NavigationContainer> { /* Navigation Provider */}
                {contentComponent} { /* Screen Content */}
        </NavigationContainer>
    );
};