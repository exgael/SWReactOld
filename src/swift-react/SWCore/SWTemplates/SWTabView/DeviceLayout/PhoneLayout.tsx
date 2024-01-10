import {ReactElement, ReactNode, useState} from 'react';
import {BottomBar, TopBar} from "../../../../components";
import {useNavigationStack} from "../../../SWProvider/NavigationStack/NavigationStackContext";
import {SwipeableProps, useSwipeable} from 'react-swipeable';

interface PhoneContentProps {
    children: ReactNode;
}

function PhoneLayout({children}: PhoneContentProps): ReactElement {

    const {canPop, pop} = useNavigationStack();

    // Swipe

    const swipeProps: SwipeableProps = {
        delta: {right: 50},
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: false,
        swipeDuration: 500,
    }

    const handlers = useSwipeable({
        onSwipedRight: (): void => {
            if (canPop) pop();
        },
        ...swipeProps
    });

    // Constructing the PhoneLayout

    const mainContent = (
        <div
            className={!canPop ? "main-content-with-large-title" : "main-content"}
            {...handlers}
        >
            {children}
        </div>
    );

    return (
        <>
            {TopBar().toJSX()}
            {mainContent}
            {BottomBar().toJSX()}
        </>
    )
}

export default PhoneLayout;
