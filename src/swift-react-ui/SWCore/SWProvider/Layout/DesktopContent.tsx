import { ReactNode, ReactElement } from 'react';
import { AppBar, Screen } from "../../../components";

interface DesktopContentProps {
    children: ReactNode;
}

function DesktopContent( { children }: DesktopContentProps ): ReactElement {
    return Screen(
        children
        ,
        AppBar()
            .positionFixedTop()
        ,
    );
}

export default DesktopContent;
