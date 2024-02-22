import React, {FC, useEffect, useState} from 'react';
import {Color, View} from '../../../../../SWTypes';
import {HStack, LargeTitle, RoundedRectangle, Text, Title} from "../../../../../../components";
import {useNavigationStack} from "../../../../../SWProvider/NavigationStack/NavigationStackContext";
import {ChevronBack} from "../../../../../../components/icons/chevrons";
import {withAnimation} from "../../../../../../components/animation/withAnimation";
import {SWView} from "../../../../../SWElements/SWElements";
import {useScrollContext} from "../../../../../SWProvider/scrollUnderBar/scrollContext";

const fadeInOutAnimation = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
    transition: {duration: 0.3}
};

const largeTitleAnimation = {
    initial: {opacity: 1},
    animate: {opacity: 0}, // Adjust values as needed
    exit: {opacity: 0},
    transition: {duration: 0.3}
};

export const SWTopBar: FC<{ view: View }> = ({view}) => {

    const {
        canPop,
        pop,
        currentStackItem,
        previousStackItem
    } = useNavigationStack();

    const [isLargeTitleHidden, setIsLargeTitleHidden] = useState(false);
    // Hide the large title when scrolling

    const handleScroll = () => {
        const scrollThreshold = 32;
        const scrollPosition = window.scrollY;
        setIsLargeTitleHidden(scrollPosition > scrollThreshold);
    };

    useEffect(() => {
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
            .border({
                color: Color.rgba(150, 150, 150, isLargeTitleHidden ? 0.3 : 0),
                style: "solid",
                width: "0.1px",
                side: "bottom"
            })
            .crossAxisAlignment("flex-end")
    )

    // Navigation Bar container properties
    view.classNames = ["navigation-bar", "glass"];

    // Return the NavigationBar
    return (
        <>
            <SWView view={view}>
                {navigationBar.toJSX()}
            </SWView>
            {LargeNavigationTitle()}
        </>
    );
};

function LargeNavigationTitle() {

    const {
        canPop,
        currentStackItem,
    } = useNavigationStack();

    const navigationTitle = currentStackItem?.title || '';
    const { isContentUnderNav, position } = useScrollContext();

    return (
        !canPop ? (
            navigationTitle ? (
                <div className={"large-navigation-title"} style={{ top: `${-position}px` }}>
                    {
                        withAnimation(
                            isContentUnderNav ? largeTitleAnimation.animate : largeTitleAnimation.initial,
                            isContentUnderNav ? largeTitleAnimation.animate : largeTitleAnimation.initial,
                            largeTitleAnimation.exit,
                            largeTitleAnimation.transition
                        )(
                            LargeTitle(navigationTitle)
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
    return (
        canPop ? (
            // Not at root, then simply display navigation title
            NavigationTitle(navigationTitle)
        ) : (
            // At root, interplay between large title and navigation title
            isLargeTitleHidden ? (

                withAnimation(
                    fadeInOutAnimation.initial,
                    fadeInOutAnimation.animate,
                    fadeInOutAnimation.exit,
                    fadeInOutAnimation.transition
                )(
                    NavigationTitle(navigationTitle)
                )
            ) : (
                NavigationTitle("")
            )
        )
    )
}

function NavigationTitle(title: string) {
    return Title(title)
        .frame({width: `${100 / 3}vw`, height: "100%"})
        .textAlign("center")
        .fontSize("1rem")
        .padding({bottom: "1vh"})
}

function Leading(canPop: boolean, previousStackItem: any, pop: any) {
    return (
        canPop ? (
            HStack(
                ChevronBack(() => {
                })
                    .scaleEffect(1.8)
                ,
                Text(previousStackItem?.title || "")
                    .padding({left: "1.5vw", bottom: "0.8vh"})
            )
                .mainAxisAlignment("flex-start")
                .crossAxisAlignment("center")
                .frame({width: `${100 / 3}vw`, height: "100%"})
                .padding({left: "3vw", bottom: "0.5vh"})
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
