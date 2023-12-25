import createComponent from "../../SWCore/SWElements/componentFactory";
import View from "../../SWCore/SWTypes/View";
import React from "react";
import {BarComponent} from "../../SWCore/SWTypes/Components";
import {SWBottomBar} from "../../SWCore/SWElements/SWBars/UserFlowBar/SWBottomBar";

export function BottomBar(): BarComponent{
    return createComponent<BarComponent>(
        { render: function() { return (<SWBottomBar view={this as View} />); } },
        {
            style: {
                boxSizing: "border-box",
            }
        },
    )
}
