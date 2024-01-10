import createComponent from "../../SWElements/componentFactory";
import View from "../../SWTypes/View";
import React from "react";
import {BarComponent} from "../../SWTypes/Components";
import {SWTopBar} from "../../SWTemplates/SWTabView/SWBars/Phone/TopBar/SWTopBar";

export function TopBar(): BarComponent {
    return createComponent<BarComponent>(
        {
            toJSX: function () {
                return (<SWTopBar view={this as View}/>);
            }
        },
        {
            style: {
                boxSizing: "border-box",
            }
        },
    )
}
