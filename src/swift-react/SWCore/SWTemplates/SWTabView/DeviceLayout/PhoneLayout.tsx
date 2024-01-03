import {ReactElement, ReactNode} from 'react';
import {BottomBar, LargeTitle, Screen, SideBar, Spacer, TopBar} from "../../../../components";
import {useResponsive} from "../../../SWProvider/useResponsive";
import {TabItemComponent} from "../SWTabView";
import {useNavigationStack} from "../../../SWProvider/NavigationStack/NavigationStackContext";
import {useTabView} from "../SWTabViewProvider";

interface PhoneContentProps {
    tabItems?: TabItemComponent[];
    children: ReactNode;
}

function PhoneLayout({ children, tabItems }: PhoneContentProps ): ReactElement {


    const { orientation } = useResponsive();
    const { activeTab, activeTabKey} = useTabView()
    const { stacks, pop } = useNavigationStack();
    const currentStack = stacks[activeTabKey];
    const topItem = currentStack?.items[currentStack.items.length - 1];

    const showBackButton = currentStack && currentStack.items.length > 1;
    const title = topItem?.title || 'Default Title';

    let phoneContent;

    if (orientation === 'portrait') {
        phoneContent = Screen(
            LargeTitle(title)
                .frame({width: "100vw"})
                .padding({left: "5vw"})
                .textAlign("left")
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

    return phoneContent;
}

export default PhoneLayout;
