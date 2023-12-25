
import createComponent from "../SWCore/SWElements/componentFactory";
import React from "react";
import {RoundedRectangleComponent} from "../SWCore/SWTypes/Components";
import {SWRoundedRectangle} from "../SWCore/SWElements/SWElements";

export function RoundedRectangle(cornerRadius: string): RoundedRectangleComponent {
    return createComponent<RoundedRectangleComponent>(
        { render: function() { return <SWRoundedRectangle view={this as RoundedRectangleComponent} />; } },
        { style: { borderRadius: cornerRadius } },
    );
}