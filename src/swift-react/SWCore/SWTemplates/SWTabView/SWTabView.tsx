import React, {ReactNode, useEffect} from "react";
import {View} from "../../SWTypes";
import {IconType} from "react-icons";
import {TabItemModifiers} from "../../SWModifiers/tabViewModifier/tabItemModifiers";
import {useResponsive} from "../../SWProvider/useResponsive";
import PhoneLayout from "./DeviceLayout/PhoneLayout";
import DesktopLayout from "./DeviceLayout/DesktopLayout";
import TabletLayout from "./DeviceLayout/TabletLayout";
import {useTabView} from "./SWTabViewProvider";
import {motion} from "framer-motion"
import {useNavigationStack} from "../../SWProvider/NavigationStack/NavigationStackContext";


export type TabViewComponent = View & {
    tabItems: TabItemComponent[];
}

export const SWTabView: React.FC<{ view: TabViewComponent }> = React.memo(
    ({view}) => {

        const {activeTabKey, setActiveTabKey, setTabs} = useTabView();
        const {stacks, push} = useNavigationStack();
        const {isPhone, isTablet} = useResponsive();

        useEffect(() => {

            // Populate tabs information into the context
            const tabInfo = view.tabItems.map(tabItem => ({
                key: tabItem.key!,
                title: tabItem.title,
                icon: tabItem.icon,
                iconActive: tabItem.iconActive
            }));

            setTabs(tabInfo);

            // Set the first tab as active
            setActiveTabKey(tabInfo[0].key);

        }, [view.tabItems, setTabs, setActiveTabKey]);


        // Get the current stack for the active tab
        const currentStack = stacks[activeTabKey];
        const topItem = currentStack?.items[currentStack.items.length - 1];

        let content;
        if (topItem) {
            content = (
                <>
                    <AnimatedRoute transitionType="fade" key={topItem.key}>
                        {topItem.component.toJSX()}
                    </AnimatedRoute>
                </>
            );
        } else {

            // Default view if the stack is empty
            const tabItem = view.tabItems.find(tab => tab.key === activeTabKey);
            if (!tabItem) return <div>Tab not found</div>;

            push(tabItem.view, tabItem.title, tabItem.key);

            content = (
                <>
                    <AnimatedRoute transitionType="fade" key={tabItem?.key}>
                        {tabItem?.view.toJSX()}
                    </AnimatedRoute>
                </>
            );
        }

        // Variable to store the screen content
        let screen: ReactNode;
        if (isPhone) {
            screen = <PhoneLayout>{content}</PhoneLayout>
        } else if (isTablet) {
            screen = <TabletLayout>{content}</TabletLayout>;
        } else {
            screen = <DesktopLayout>{content}</DesktopLayout>;
        }

        return screen
    }
);

// Tab Items
export type TabItemComponent = View
    & TabItemModifiers
    & {
    title: string
    view: View
    icon: IconType
    iconActive: IconType
}


type TransitionType = 'slide' | 'fade' | 'scale';

// Define the type for the component props
interface AnimatedRouteProps {
    children: ReactNode;
    transitionType: TransitionType;
}

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({children, transitionType}) => {
    let transition;

    switch (transitionType) {
        case 'slide':
            transition = slideTransition;
            break;
        case 'fade':
            transition = fadeTransition;
            break;
        case 'scale':
            transition = scaleTransition;
            break;
        default:
            transition = fadeTransition; // Default transition
    }

    return (
        <motion.div {...transition}>
            {children}
        </motion.div>
    );
};

// .transition(.slide)
const slideTransition = {
    initial: {x: 100, opacity: 0},
    animate: {x: 0, opacity: 1},
    exit: {x: -100, opacity: 0},
    transition: {duration: 0.5}
};

// .transition(.opacity)
const fadeTransition = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
    transition: {duration: 0.1}
};

//.transition(.scale)
const scaleTransition = {
    initial: {scale: 0},
    animate: {scale: 1},
    exit: {scale: 0},
    transition: {duration: 0.4}
};