import createComponent from "../../SWElements/componentFactory";
import View from "../../SWTypes/View";
import React from "react";
import {BarComponent} from "../../SWTypes/Components";
import {SWSideBar} from "../../SWTemplates/SWTabView/SWBars/UserFlowBar/SWSideBar";

export function SideBar(): BarComponent {
    return createComponent<BarComponent>(
        {
            toJSX: function () {
                return (<SWSideBar view={this as View}/>);
            }
        },
        {
            style: {
                boxSizing: "border-box",
            }
        },
    )
}
