import {ReactElement, ReactNode} from 'react';
import {BottomBar, Screen, SideBar, Spacer, TopBar} from "../../../../components";
import {useResponsive} from "../../../SWProvider/useResponsive";
import {TabItemComponent} from "../SWTabView";

interface PhoneContentProps {
    tabItems?: TabItemComponent[];
    children: ReactNode;
}

function PhoneLayout({ children, tabItems }: PhoneContentProps ): ReactElement {

    const { orientation } = useResponsive();

    let phoneContent;

    if (orientation === 'portrait') {
        phoneContent = Screen(
            children
            ,
            TopBar()
                .positionFixedTop()
            ,
            BottomBar()
                .positionFixedBottom()
            ,
        );
    } else {
        phoneContent = Screen(
            children
            ,
            SideBar()
                .positionFixedSide("left")
            ,
        );
    }

    return phoneContent;
}

export default PhoneLayout;
