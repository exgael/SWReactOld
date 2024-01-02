import View from "../SWCore/SWTypes/View";
import {ButtonComponent} from "../SWCore/SWTypes/Components";
import createComponent from "../SWCore/SWElements/componentFactory";
import {SWButton} from "../SWCore/SWElements/SWElements";
import React from "react";

export function Button(action: () => void, label: View): ButtonComponent {
    return createComponent<ButtonComponent>(
        { toJSX: function() { return <SWButton view={this as ButtonComponent} />; } },
        { action, label },
    );
}