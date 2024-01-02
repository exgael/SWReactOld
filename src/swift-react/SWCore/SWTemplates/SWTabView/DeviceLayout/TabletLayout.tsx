import {ReactElement, ReactNode} from 'react';
import {SideBar, Screen} from "../../../../components";

interface TabletContentProps {
    orientation: 'portrait' | 'landscape';
    children: ReactNode;
}

function TabletLayout({ orientation, children }: TabletContentProps ): ReactElement {
    let tabletContent;

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
