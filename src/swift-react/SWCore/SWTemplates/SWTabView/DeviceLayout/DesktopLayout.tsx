import React, {ReactElement, ReactNode} from 'react';
import {AppBar} from "../../../../components";

interface DesktopContentProps {
    children: ReactNode;
}

function DesktopLayout({children}: DesktopContentProps): ReactElement {

    const mainContent = (
        <div
            className={"main-content"}
        >
            {children}
        </div>
    );

    return (
        <>
            {AppBar().toJSX()}
            {mainContent}
        </>
    )
}

export default DesktopLayout;
