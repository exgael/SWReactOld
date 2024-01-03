import {ReactElement, ReactNode, useState} from 'react';
import {BottomBar, LargeTitle, Screen, SideBar, TopBar} from "../../../../components";
import {useResponsive} from "../../../SWProvider/useResponsive";
import {TabItemComponent} from "../SWTabView";
import {useNavigationStack} from "../../../SWProvider/NavigationStack/NavigationStackContext";
import { useSwipeable } from 'react-swipeable';
import {useSpring} from "react-spring";

interface PhoneContentProps {
    tabItems?: TabItemComponent[];
    children: ReactNode;
}

function PhoneLayout({ children, tabItems }: PhoneContentProps ): ReactElement {

    const [position, setPosition] = useState(0); // Track swipe position
    const threshold = 60; // Define swipe threshold

    const { orientation } = useResponsive();
    const { currentStackItem, canPop, pop } = useNavigationStack();
    const title = currentStackItem?.title || undefined;

    // Set up the swipe handler
    const handlers = useSwipeable({
        onSwiping: (eventData) => {
            if (eventData.dir === 'Right') {
                setPosition(Math.min(eventData.deltaX, window.innerWidth));
            }
        },
        onSwiped: (eventData) => {
            if (eventData.dir === 'Right' && position > threshold) {
                if (canPop) pop(); // Trigger pop if swipe exceeds threshold and direction is right
            }
            setPosition(0); // Reset position regardless of swipe direction
        },
        trackMouse: true
    });

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
            <div className={"content"} style={{ paddingBottom:"10vh" }}>{children}</div>
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

    return <div style={{ height: "100%", width: "100%" } } {...handlers}> {phoneContent} </div>;
}

export default PhoneLayout;
