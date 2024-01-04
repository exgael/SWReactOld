import React, {FC, useEffect, useState} from 'react';
import { observer } from 'mobx-react';
import { View, Color } from '../../../../../SWTypes';
import {HStack, RoundedRectangle, Text, Title, VStack} from "../../../../../../components";
import {useTabView} from "../../../SWTabViewProvider";
import {useNavigationStack} from "../../../../../SWProvider/NavigationStack/NavigationStackContext";
import {ChevronBack} from "../../../../../../components/icons/chevrons";
import {withAnimation} from "../../../../../../components/animation/withAnimation";

const fadeInOutAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
};

const largeTitleAnimation = {
    initial: { opacity: 1 },
    animate: { opacity: 0 }, // Adjust values as needed
    exit: { opacity: 1 },
    transition: { duration: 0.2 }
};


export const SWTopBar: FC<{ view: View }> = observer(({ view }) => {

    const {
        canPop,
        pop,
        currentStackItem,
        previousStackItem
    } = useNavigationStack();
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


    const navigationTitle = currentStackItem?.title || 'Default Title';

    const appBarLayout = (
        // VStack({alignment: "flex-start"})(

            HStack({alignment: "space-around"})(

                canPop ? (
                HStack({alignment: "flex-start"})(
                    ChevronBack(() => {})
                        .scaleEffect(1.8)
                    ,
                    Text(previousStackItem?.title || "")
                        .padding({left: "1.5vw", bottom: "0.8vh"})
                )
                    .crossAxisAlignment("center")
                    .frame({width: `${100 / 3}vw`, height: "100%"})
                    .padding({ left: "3vw", bottom: "0.5vh"})
                    .foregroundStyle(Color.blue)
                        .onClick(() => {
                            pop();
                        })
            ) : (
                Text("")
                    .frame({width: `${100 / 3}vw`, height: "100%"})
            )
            ,

            canPop ? (

                // Not at root, then simply display navigation title
                NavigationTitle(navigationTitle)
            ) : (

                // At root, interplay between large title and navigation title
                withAnimation(
                    isLargeTitleHidden ? fadeInOutAnimation.animate : fadeInOutAnimation.initial,
                    isLargeTitleHidden ? fadeInOutAnimation.animate : fadeInOutAnimation.initial,
                    fadeInOutAnimation.exit,
                    fadeInOutAnimation.transition
                )(
                    NavigationTitle(navigationTitle)
                )
            )
            ,

                Trailing()
        )
            .setClassName([ isLargeTitleHidden ? "glass" : "no-glass", "navigation-bar"])
            .border({color: Color.rgba(150, 150, 150, isLargeTitleHidden ? 0.3 : 0), style: "solid", width:  "0.1px"})
            .crossAxisAlignment("flex-end")
    )

    return (
            <div style={view.style} {...view.events}>
                {appBarLayout.toJSX()}
            </div>
    );
});


function NavigationTitle(title: string) {
    return Title(title)
        .frame({width: `${100 / 3}vw`, height: "100%"})
        .foregroundStyle(Color.black)
        .textAlign("center")
        .fontSize("1rem")
        .padding({bottom:"1vh"})
}

function Leading(canPop: boolean, previousStackItem: any, pop: any) {
    return HStack({alignment: "space-around"})(

        canPop ? (
            HStack({alignment: "flex-start"})(
                ChevronBack(() => {})
                    .scaleEffect(1.8)
                ,
                Text(previousStackItem?.title || "")
                    .padding({left: "1.5vw", bottom: "0.8vh"})
            )
                .crossAxisAlignment("center")
                .frame({width: `${100 / 3}vw`, height: "100%"})
                .padding({ left: "3vw", bottom: "0.5vh"})
                .foregroundStyle(Color.blue)
                .onClick(() => {
                    pop();
                })
        ) : (
            Text("")
                .frame({width: `${100 / 3}vw`, height: "100%"})
        )
    )
}


function Trailing() {
    return           RoundedRectangle("0")

        // TODO Show stuff here
        .background(Color.clear)

        // Occupies 1/3 of the screen
        .frame({width: `${100 / 3}vw`, height: "100%"})
}

export default SWTopBar;
