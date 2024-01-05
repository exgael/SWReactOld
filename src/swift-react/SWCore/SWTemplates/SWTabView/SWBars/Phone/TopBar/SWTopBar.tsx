import React, {FC, useEffect, useState} from 'react';
import { observer } from 'mobx-react';
import { View, Color } from '../../../../../SWTypes';
import {HStack, LargeTitle, RoundedRectangle, Text, Title} from "../../../../../../components";
import {useNavigationStack} from "../../../../../SWProvider/NavigationStack/NavigationStackContext";
import {ChevronBack} from "../../../../../../components/icons/chevrons";
import {withAnimation} from "../../../../../../components/animation/withAnimation";
import {SWView} from "../../../../../SWElements/SWElements";

const fadeInOutAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
};

const largeTitleAnimation = {
    initial: { opacity: 1 },
    animate: { opacity: 0 }, // Adjust values as needed
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
};

export const SWTopBar: FC<{ view: View }> = observer(({ view }) => {

    const {
        canPop,
        pop,
        currentStackItem,
        previousStackItem
    } = useNavigationStack();

    // Hide the large title when scrolling

    const [isLargeTitleHidden, setIsLargeTitleHidden] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 31;
            const scrollPosition = window.scrollY;
            setIsLargeTitleHidden(scrollPosition > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get the navigation title

    const navigationTitle = currentStackItem?.title || '';

    // Constructing the NavigationBar

    const navigationBar = (
        HStack(
            Leading(canPop, previousStackItem, pop),
            Center(canPop, navigationTitle, isLargeTitleHidden),
            Trailing()
        )
            .mainAxisAlignment("space-around")
            .border({color: Color.rgba(150, 150, 150, isLargeTitleHidden ? 0.3 : 0), style: "solid", width:  "0.1px", side: "bottom"})
            .crossAxisAlignment("flex-end")
    )

    // Setting the class names for the Navigation Bar container
    view.classNames = [isLargeTitleHidden ? "glass" : "no-glass", "navigation-bar"];
    return (
        <>
            <SWView view={view}>
                {navigationBar.toJSX()}
            </SWView>
            {LargeNavigationTitle(canPop, navigationTitle, isLargeTitleHidden)}
        </>
    );
});


function LargeNavigationTitle(canPop: boolean, title: string | undefined, isLargeTitleHidden: boolean) {

    return (
        !canPop ? (
            title ? (
                <div className={"large-navigation-title"}>
                    {
                        withAnimation(
                            isLargeTitleHidden ?  largeTitleAnimation.animate : largeTitleAnimation.initial,
                            isLargeTitleHidden ?  largeTitleAnimation.animate : largeTitleAnimation.initial,
                            largeTitleAnimation.exit,
                            largeTitleAnimation.transition
                        )(
                            LargeTitle(title)
                        )
                            .toJSX()
                    }
                </div>
            ) : (
                <></>
            )
        ) : (
            <></>
        )
    )
}


function Center(canPop: boolean, navigationTitle: string, isLargeTitleHidden: boolean) {

    const titleAnimation = isLargeTitleHidden ? fadeInOutAnimation.animate : fadeInOutAnimation.initial;

    return (
        canPop ? (
            // Not at root, then simply display navigation title
            NavigationTitle(navigationTitle)
        ) : (
            // At root, interplay between large title and navigation title
            withAnimation(
                titleAnimation,
                titleAnimation,
                fadeInOutAnimation.exit,
                fadeInOutAnimation.transition
            )(
                NavigationTitle(navigationTitle)
            )
        )
    )
}


function NavigationTitle(title: string) {
    return Title(title)
        .frame({width: `${100 / 3}vw`, height: "100%"})
        .foregroundStyle(Color.black)
        .textAlign("center")
        .fontSize("1rem")
        .padding({bottom:"1vh"})
}

function Leading(canPop: boolean, previousStackItem: any, pop: any) {
    return (
        canPop ? (
            HStack(
                ChevronBack(() => {})
                    .scaleEffect(1.8)
                ,
                Text(previousStackItem?.title || "")
                    .padding({left: "1.5vw", bottom: "0.8vh"})
            )
                .mainAxisAlignment("flex-start")
                .crossAxisAlignment("center")
                .frame({width: `${100 / 3}vw`, height: "100%"})
                .padding({ left: "3vw", bottom: "0.5vh"})
                .foregroundStyle(Color.blue)
                .onClick(() => {
                    pop();
                })
        ) : (
            Trailing()
        )
    )
}

function Trailing() {
    return RoundedRectangle("0")
        .background(Color.clear)
        // Occupies 1/3 of the screen
        .frame({width: `${100 / 3}vw`, height: "100%"})
}

export default SWTopBar;
