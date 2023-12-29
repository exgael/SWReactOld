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

export const Content: React.FC<ContentProps> = ({ destinations }) => {
    const { width, orientation } = useResponsive();

    let contentComponent: ReactNode;
    userBarStore.setDestinations(destinations);
    const children = <Body destinations={destinations} />;

    // Modals
    const { isAlertPresented } = useAlert();

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
                <InstallNotification/> { /* Install Notification */}
                {/* React component that uses the MobX state */}
                { isAlertPresented && <Alert/> }
        </NavigationContainer>
    );
};

export const useSheet = () => {
    return useObserver(() => ({
        isSheetPresented: sheet.isPresented,
        sheetContent: sheet.view,
        showSheet: sheet.show,
        hideSheet: sheet.hide,
    }));
};

export const useAlert = () => {
    return useObserver(() => ({
        isAlertPresented: alert.isPresented,
        alertTitle: alert.title,
        alertMessage: alert.message,
        showAlert: alert.show,
        hideAlert: alert.hide,
    }));
};

