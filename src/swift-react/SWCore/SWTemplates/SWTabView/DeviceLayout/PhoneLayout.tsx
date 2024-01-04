import {ReactElement, ReactNode, useState} from 'react';
import {BottomBar, LargeTitle, Screen, SideBar, TopBar} from "../../../../components";
import {useResponsive} from "../../../SWProvider/useResponsive";
import {TabItemComponent} from "../SWTabView";
import {useNavigationStack} from "../../../SWProvider/NavigationStack/NavigationStackContext";
import { useSwipeable, SwipeableProps } from 'react-swipeable';
interface PhoneContentProps {
    tabItems?: TabItemComponent[];
    children: ReactNode;
}

function PhoneLayout({ children, tabItems }: PhoneContentProps ): ReactElement {

    const [blur, setBlur] = useState(0); // Track blur amount

    const {orientation} = useResponsive();
    const {currentStackItem, canPop, pop} = useNavigationStack();
    const title = currentStackItem?.title || undefined;

    const swipeProps: SwipeableProps = {
        delta: { right: 10 },
        preventScrollOnSwipe: false,
        trackTouch: true,
        trackMouse: false,
        swipeDuration: 250,
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

    // Set up the swipe handler
    // const handlers2 = useSwipeable({
    //     onSwiping: (eventData) => {
    //         if (!isScrolling) {
    //             const deltaX = Math.min(eventData.deltaX, window.innerWidth);
    //             setPosition(deltaX);
    //             setBlur(Math.min(5 * (deltaX / window.innerWidth), 5)); // Example: Max blur at 5px
    //         }
    //     },
    //     onSwipedRight: (eventData) => {
    //         if (!isScrolling) {
    //             if (canPop) pop(); // Trigger pop if swipe exceeds threshold and direction is right
    //         }
    //         setPosition(0); // Reset position regardless of swipe direction
    //         setBlur(0); // Reset blur
    //     },
    //     trackMouse: true,
    // });

    let phoneContent;

    if (orientation === 'portrait') {
        phoneContent = Screen(
            // If pop is possible, then we do not display the large title (current is not root of navigation stack)
            // If pop is not possible and title is defined, then we display the large title

            !canPop && title ? (
                LargeTitle(title)
                    .frame({width: "100vw"})
                    .padding({left: "5vw"})
                    .textAlign("left")
            ) : undefined
            ,
            <div className={"content"} style={{
                paddingBottom: "10vh",
                filter: `blur(${blur}px)`,
                transition: 'filter 0.1s',
                touchAction: stopScroll ? 'none' : 'pan-y',


            }} {...handlers}>
                {children}
            </div>
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

    return <div style={{height: "100%", width: "100%", }} >
        {phoneContent}
    </div>;
}

export default PhoneLayout;
