import React, {FC, useEffect, useState} from 'react';
import { observer } from 'mobx-react';
import { View, Color } from '../../../../../SWTypes';
import {HStack, LargeTitle, RoundedRectangle, Spacer, Text, Title, VStack} from "../../../../../../components";
import {useTabView} from "../../../SWTabViewProvider";
import {useNavigationStack} from "../../../../../SWProvider/NavigationStack/NavigationStackContext";
import {ChevronBack} from "../../../../../../components/icons/chevrons";

export const SWTopBar: FC<{ view: View }> = observer(({ view }) => {

    const { activeTab, activeTabKey} = useTabView()
    const { stacks, pop } = useNavigationStack();
    const [isLargeTitleHidden, setIsLargeTitleHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const largeTitle = document.querySelector('.LargeTitle') as HTMLElement;

            if (!largeTitle) return;

            const isHidden = scrollPosition > 5; // Adjust this value based on your needs
            setIsLargeTitleHidden(isHidden);

            if (scrollPosition > 5) {
                largeTitle.style.transform = `translateY(${-scrollPosition}px)`;
                largeTitle.style.opacity = String(Math.max(1 - scrollPosition / 100, 0));
            } else {
                largeTitle.style.transform = 'translateY(0)';
                largeTitle.style.opacity = String(1);
            }
        };

        // Attach the event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const currentStack = stacks[activeTabKey];
    const topItem = currentStack?.items[currentStack.items.length - 1];

    const showBackButton = currentStack && currentStack.items.length > 1;
    const title = topItem?.title || 'Default Title';

    const appBarLayout = VStack({alignment: "flex-start"})(
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

            Title(activeTab.title || title || "")
                .frame({width: `${100 / 3}vw`, height: "100%"})
                .border({color: Color.rgba(150, 150, 150, 0.4), style: "solid", width: "1px"})
                .opacity(0)
                .foregroundStyle(Color.black)
                .textAlign("center")
                .fontSize("1rem")
                .padding({bottom:"1vh"})
            ,
            RoundedRectangle("0")
                .background(Color.clear)
                .frame({width: `${100 / 3}vw`, height: "100%"})
        )
            .setClassName(["glass", "top-bar"])
                .border({color: Color.rgba(150, 150, 150, isLargeTitleHidden ? 0.4 : 0), style: "solid", width:  "1px"})
            .crossAxisAlignment("flex-end")
        ,

            LargeTitle(title)
                .textAlign("left")
                // .padding({left: "5vw"})
                .setClassName(["LargeTitle"])
                .frame({width: "100vw", height: "100%"})
    )

    return (
            <div style={view.style} {...view.events}>
                {appBarLayout.toJSX()}
            </div>
    );
});

export default SWTopBar;
