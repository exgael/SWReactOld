import View from "../SWCore/SWTypes/View";
import createComponent from "../SWCore/SWElements/componentFactory";
import {SWView} from "../SWCore/SWElements/SWElements";
import React from "react";
import {RoundedRectangleComponent} from "../SWCore/SWTypes/Components";

export function RoundedRectangle(): RoundedRectangleComponent {
    return createComponent<RoundedRectangleComponent>(
        { render: function() { return <SWView view={this as View} />; } },
        {},
    );
}