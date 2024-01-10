import {ReactElement, ReactNode} from 'react';
import {Screen, SideBar} from "../../../../components";
import {useResponsive} from "../../../SWProvider/useResponsive";

interface TabletContentProps {
    children: ReactNode;
}

function TabletLayout({children}: TabletContentProps): ReactElement {
    let tabletContent;

    const {orientation} = useResponsive();

    if (orientation === 'portrait') {
        tabletContent = Screen(
            children
            ,
            SideBar()
                .positionFixedSide("left")
            ,
        );
    } else { // landscape orientation
        tabletContent = Screen(
            children
            ,
            SideBar()
                .positionFixedSide("left")
            ,
        );
    }

    return tabletContent;
}

export default TabletLayout;
