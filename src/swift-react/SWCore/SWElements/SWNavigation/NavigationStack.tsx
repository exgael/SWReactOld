import {View} from "../../SWTypes";
import React from "react";
import {SWView} from "../SWElements";

export type NavigationStackComponent = View & {
    child: View
}

export const SWNavigationStack: React.FC<{ view: NavigationStackComponent }> = React.memo(
    ({ view }) => {

        // Maybe handle router wrapping here ?

        // Define text-specific styles or event overrides here
        const overrideStyle =  { /* ... */ };
        const overrideEvents = { /* ... */ };

        return (
            <SWView view={view} overrideStyles={overrideStyle} overrideEvents={overrideEvents}>
                {view.child.toJSX()}
            </SWView>
        )
    }
);