import React from "react";
import createComponent from "../../SWCore/SWElements/componentFactory";
import {View} from "../../SWCore";
import {SWAlert} from "../../SWCore/SWElements/SWModals/Alert/SWAlert";

export function Alert() {
    return createComponent<View>(
        {
            toJSX: function () {
                return <SWAlert view={this as View}/>;
            }
        },
        {}
    )
        .toJSX();
}