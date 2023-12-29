import createComponent from "../../SWCore/SWElements/componentFactory";
import View from "../../SWCore/SWTypes/View";
import React from "react";
import {BarComponent} from "../../SWCore/SWTypes/Components";
import {SWSideBar} from "../../SWCore/SWTemplates/SWBars/UserFlowBar/SWSideBar";

export function SideBar(): BarComponent {
    return createComponent<BarComponent>(
        { render: function() { return (<SWSideBar view={this as View} />); } },
        {
            style: {
                boxSizing: "border-box",
            }
        },
    )
}
