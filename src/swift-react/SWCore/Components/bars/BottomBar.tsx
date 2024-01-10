import createComponent from "../../SWElements/componentFactory";
import View from "../../SWTypes/View";
import React from "react";
import {BarComponent} from "../../SWTypes/Components";
import {SWBottomBar} from "../../SWTemplates/SWTabView/SWBars/Phone/BottomBar/SWBottomBar";

export function BottomBar(): BarComponent {
    return createComponent<BarComponent>(
        {
            toJSX: function () {
                return (<SWBottomBar view={this as View}/>);
            }
        },
        {}
    )
}
