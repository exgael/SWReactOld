import {ReactElement, ReactNode, useState} from 'react';
import {BottomBar, LargeTitle, TopBar} from "../../../../components";
import {useNavigationStack} from "../../../SWProvider/NavigationStack/NavigationStackContext";
import { useSwipeable, SwipeableProps } from 'react-swipeable';
import {withAnimation} from "../../../../components/animation/withAnimation";
interface PhoneContentProps {
    children: ReactNode;
}

function PhoneLayout({ children }: PhoneContentProps ): ReactElement {

    const {currentStackItem, canPop, pop} = useNavigationStack();

    // Swipe

    const swipeProps: SwipeableProps = {
        delta: { right: 10 },
        preventScrollOnSwipe: false,
        trackTouch: true,
        trackMouse: false,
        swipeDuration: 1000,
    }

    const [stopScroll, setStopScroll] = useState(false);
    const handlers = useSwipeable({
        onSwipeStart: () => setStopScroll(true),
        onSwiped: () => setStopScroll(false),
        onSwipedRight: (): void => {
            if (canPop) pop();
        },
        ...swipeProps
    });

    // Constructing the PhoneLayout

    const mainContent = (
        <div
            className={!canPop? "main-content-with-large-title" : "main-content"}
            style={{
                touchAction: stopScroll ? 'none' : 'pan-y',
                WebkitOverflowScrolling: 'touch',
                minHeight: "100vh", // To avoid the content from jumping when the keyboard is opened
            }}
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
