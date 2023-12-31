import React from "react";
import createComponent from "../../SWCore/SWElements/componentFactory";
import {View} from "../../SWCore";
import {SWSheet} from "../../SWCore/SWElements/SWModals/Sheet/SWSheet";

export function Sheet() {
    return createComponent<View>(
        { render: function() { return <SWSheet view={this as View} />; } },
        {}
    )
        .render();
}