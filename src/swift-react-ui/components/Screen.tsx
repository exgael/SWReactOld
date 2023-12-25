import createComponent from "../SWCore/SWElements/componentFactory";
import {ScreenComponent} from "../SWCore/SWTypes/Components";
import {SWScreen} from "../SWCore/SWElements/SWElements";
import {layoutModifiers} from "../SWCore/SWModifiers/layout/layoutModifiers";
import React from "react";

export function Screen(...children: any[]) {
    return createComponent<ScreenComponent>(
        {
            render: function() {
                return <SWScreen view={this as ScreenComponent} />;
            }
        },

        {
            children,
            style: {
                display: "flex",
                position: "relative",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }
        },
        layoutModifiers
    )
        .frame({width: "100vw", height: "100vh"})
        .render()
}