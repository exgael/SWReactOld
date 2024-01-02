import View from "../../SWCore/SWTypes/View";
import {NavigationLinkComponent} from "../../SWCore/SWTypes/Components";
import createComponent from "../../SWCore/SWElements/componentFactory";
import {SWNavigationLink} from "../../SWCore/SWElements/SWNavigation/SWNavElement";
import React from "react";

export function NavigationLink(label: View, destination: View): NavigationLinkComponent {
    return createComponent<NavigationLinkComponent>(
        { toJSX: function() { return <SWNavigationLink view={this as NavigationLinkComponent} />; } },
        { label, destination }
    );
}