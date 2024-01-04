import {ReactElement, ReactNode, useEffect, useRef, useState} from 'react';
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

    const {orientation} = useResponsive();
    const {currentStackItem, canPop, pop} = useNavigationStack();
    const title = currentStackItem?.title || undefined;


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

    // Tab bar during scroll

    const tabRef = useRef<HTMLDivElement>(null); // Reference to the tab bar
    const [scrollInterrupted, setScrollInterrupted] = useState(false);

    useEffect(() => {
        const handleTabTouchStart = () => {
            // Temporarily disable scrolling
            setScrollInterrupted(true);

            // Re-enable scrolling after a short delay
            setTimeout(() => {
                setScrollInterrupted(false);
            }, 130); // Adjust this delay as needed
        };

        const tabBarElement = tabRef.current;
        if (tabBarElement) {
            tabBarElement.addEventListener('touchstart', handleTabTouchStart, { passive: false });
        }

        return () => {
            if (tabBarElement) {
                tabBarElement.removeEventListener('touchstart', handleTabTouchStart);
            }
        };
    }, []);

    // Constructing the PhoneLayout

    let phoneContent;
    if (orientation === 'portrait') {
        phoneContent = Screen(
            // If pop is possible, then we do not display the large title (current is not root of navigation stack)
            // If pop is not possible and title is defined, then we display the large title

            !canPop && title ? (
                LargeTitle(title)
                    .setClassName(["large-navigation-title"])
            ) : undefined
            ,
            <div className={!canPop? "main-content-with-large-title" : "main-content"} style={{
                touchAction: stopScroll ? 'none' : 'pan-y',

            }} {...handlers}>
                {children}
            </div>

            ,
            TopBar()
            ,
            BottomBar()
                .setRef(tabRef)
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
