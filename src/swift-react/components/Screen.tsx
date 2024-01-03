import createComponent from "../SWCore/SWElements/componentFactory";
import {ScreenComponent} from "../SWCore/SWTypes/Components";
import {SWScreen} from "../SWCore/SWElements/SWElements";
import {layoutModifiers} from "../SWCore/SWModifiers/layout/layoutModifiers";
import React from "react";

export function Screen(...children: any[]) {
    return createComponent<ScreenComponent>(
        {
            toJSX: function() {
                return <SWScreen view={this as ScreenComponent} />;
            }
        },

        {
            children,
            style: {
                display: "flex",
                position: "relative",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
            }
        },
        layoutModifiers
    )
        .toJSX()
}