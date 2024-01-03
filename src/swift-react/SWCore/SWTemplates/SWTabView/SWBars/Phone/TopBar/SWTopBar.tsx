import React, {FC, useEffect, useState} from 'react';
import { observer } from 'mobx-react';
import { View, Color } from '../../../../../SWTypes';
import {HStack, LargeTitle, RoundedRectangle, Spacer, Text, Title, VStack} from "../../../../../../components";
import {useTabView} from "../../../SWTabViewProvider";
import {useNavigationStack} from "../../../../../SWProvider/NavigationStack/NavigationStackContext";
import {ChevronBack} from "../../../../../../components/icons/chevrons";
import {withAnimation} from "../../../../../../components/animation/withAnimation";


const fadeInOutAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
};

const largeTitleAnimation = {
    initial: { opacity: 1 },
    animate: { opacity: 0 }, // Adjust values as needed
    exit: { opacity: 1 },
    transition: { duration: 0.2 }
};


export const SWTopBar: FC<{ view: View }> = observer(({ view }) => {

    const { activeTab, activeTabKey} = useTabView()
    const { stacks, pop } = useNavigationStack();
    const [isLargeTitleHidden, setIsLargeTitleHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 0; // Threshold for the transition
            const scrollPosition = window.scrollY;
            if (scrollPosition > scrollThreshold) {
                setIsLargeTitleHidden(true);
            } else {
                setIsLargeTitleHidden(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const currentStack = stacks[activeTabKey];
    const topItem = currentStack?.items[currentStack.items.length - 1];

    const showBackButton = currentStack && currentStack.items.length > 1;
    const title = topItem?.title || 'Default Title';

    const appBarLayout = (
        VStack({alignment: "flex-start"})(

            HStack({alignment: "space-around"})(

        showBackButton ? (
                ChevronBack(
               () => pop(activeTabKey)
                )
                    .frame({width: `${100 / 3}vw`, height: "100%"})
                    .padding({ left: "8vw", bottom: "0.5vh"})
                    .foregroundStyle(Color.blue)
                    .scaleEffect(1.8)
            ) : (
                Text("")
                    .frame({width: `${100 / 3}vw`, height: "100%"})
            )
            ,

            withAnimation(
                isLargeTitleHidden ? fadeInOutAnimation.initial : fadeInOutAnimation.animate,
                isLargeTitleHidden ? fadeInOutAnimation.animate : fadeInOutAnimation.initial,
                fadeInOutAnimation.exit,
                fadeInOutAnimation.transition
            )(
                Title(activeTab.title || title || "")
                    .frame({width: `${100 / 3}vw`, height: "100%"})
                    .foregroundStyle(Color.black)
                    .textAlign("center")
                    .fontSize("1rem")
                    .padding({bottom:"1vh"})
            )
            ,
            RoundedRectangle("0")
                .background(Color.clear)
                .frame({width: `${100 / 3}vw`, height: "100%"})
        )
            .setClassName(["glass", "top-bar"])
            .border({color: Color.rgba(150, 150, 150, isLargeTitleHidden ? 0.4 : 0), style: "solid", width:  "1px"})
            .crossAxisAlignment("flex-end")
        ,
            withAnimation(
                isLargeTitleHidden ? largeTitleAnimation.initial : largeTitleAnimation.animate,
                isLargeTitleHidden ? largeTitleAnimation.animate : largeTitleAnimation.initial,
                largeTitleAnimation.exit,
                largeTitleAnimation.transition
            )(
                LargeTitle(title)
                    .textAlign("left")
                    .padding({left: "3vw"})
                    .frame({width: "100vw", height: "100%"})
            )
    ))

    return (
            <div style={view.style} {...view.events}>
                {appBarLayout.toJSX()}
            </div>
    );
});

export default SWTopBar;
