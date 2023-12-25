import createComponent from "../../SWCore/SWElements/componentFactory";
import View from "../../SWCore/SWTypes/View";
import {SWAppBar} from "../../SWCore/SWElements/SWBars/UserFlowBar/SWAppBar";
import React from "react";
import {BarComponent} from "../../SWCore/SWTypes/Components";

export function AppBar(): BarComponent {
    return createComponent<BarComponent>(
        { render: function() { return (<SWAppBar view={this as View} />); } },
        {
            style: {
                boxSizing: "border-box",
            }
        },
    )
}
