import React, {ReactElement, ReactNode} from 'react';
import {BottomBar, Screen, SideBar, Spacer, TopBar} from "../../../components";

interface PhoneContentProps {
    orientation: 'portrait' | 'landscape';
    children: ReactNode;
}

function PhoneContent( { orientation, children }: PhoneContentProps ): ReactElement {

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

export default PhoneContent;
