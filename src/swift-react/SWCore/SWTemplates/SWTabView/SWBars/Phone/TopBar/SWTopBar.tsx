import React, {FC} from 'react';
import { observer } from 'mobx-react';
import { View, Color } from '../../../../../SWTypes';
import {HStack, RoundedRectangle, Spacer, Text, Title, VStack} from "../../../../../../components";
import {useTabView} from "../../../SWTabViewProvider";
import {useNavigationStack} from "../../../../../SWProvider/NavigationStack/NavigationStackContext";
import {ChevronBack} from "../../../../../../components/icons/chevrons";

export const SWTopBar: FC<{ view: View }> = observer(({ view }) => {

    const { activeTab, activeTabKey} = useTabView()
    const { stacks, pop } = useNavigationStack();

    const currentStack = stacks[activeTabKey];
    const topItem = currentStack?.items[currentStack.items.length - 1];

    const showBackButton = currentStack && currentStack.items.length > 1;
    const title = topItem?.title || 'Default Title';

    const appBarLayout = HStack({alignment: "space-around"})(

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
            .foregroundStyle(Color.black)
            .textAlign("center")
            .fontSize("1.25rem")
            .padding({bottom:"1vh"})
        ,
        RoundedRectangle("0")
            .background(Color.clear)
            .frame({width: `${100 / 3}vw`, height: "100%"})
    )
        .setClassName(["glass", "top-bar"])
        .crossAxisAlignment("flex-end")

    return (
            <div style={view.style} {...view.events}>
                {appBarLayout.toJSX()}
            </div>
    );
});

export default SWTopBar;
