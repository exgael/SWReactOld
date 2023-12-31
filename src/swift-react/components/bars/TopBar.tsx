import createComponent from "../../SWCore/SWElements/componentFactory";
import View from "../../SWCore/SWTypes/View";
import React from "react";
import {BarComponent} from "../../SWCore/SWTypes/Components";
import {SWTopBar} from "../../SWCore/SWTemplates/SWBars/NavigationBar/SWTopBar";

export function TopBar(): BarComponent {
    return createComponent<BarComponent>(
        { render: function() { return (<SWTopBar view={this as View} />); } },
        {
            style: {
                boxSizing: "border-box",
            }
        },
    )
}
