import View from "../SWCore/SWTypes/View";
import {NavigationComponent} from "../SWCore/SWTypes/Components";
import createComponent from "../SWCore/SWElements/componentFactory";
import {SWNavigationLink} from "../SWCore/SWElements/SWNavigation/SWNavElement";
import React from "react";

export function NavigationLink(destination: string, label: View): NavigationComponent {
    return createComponent<NavigationComponent>(
        { render: function() { return <SWNavigationLink view={this as NavigationComponent} />; } },
        { destination: destination, label },
    );
}