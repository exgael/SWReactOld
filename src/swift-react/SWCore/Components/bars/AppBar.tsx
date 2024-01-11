import createComponent from "../../SWElements/componentFactory";
import View from "../../SWTypes/View";
import {SWAppBar} from "../../SWTemplates/SWTabView/SWBars/Desktop/SWAppBar";
import React from "react";
import {BarComponent} from "../../SWTypes/Components";

export function AppBar(): BarComponent {
    return createComponent<BarComponent>(
        {
            toJSX: function () {
                return (<SWAppBar view={this as View}/>);
            }
        },
        {},
    )
}
