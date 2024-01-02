import {View} from "../../SWCore";
import createComponent from "../../SWCore/SWElements/componentFactory";
import React from "react";
import {NavigationStackComponent, SWNavigationStack} from "../../SWCore/SWElements/SWNavigation/NavigationStack";

export function NavigationStack(child: View): NavigationStackComponent {
    return createComponent<NavigationStackComponent>(
        { toJSX: function() { return (<SWNavigationStack view={this as NavigationStackComponent} />); } },
        { child }
    )
}