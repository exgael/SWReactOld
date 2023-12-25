import React from "react";
import {FullscreenCoverComponent} from "../../SWCore/SWTypes/Components";
import createComponent from "../../SWCore/SWElements/componentFactory";
import {SWFullScreenCover} from "../../SWCore/SWElements/SWModals/FullscreenCover/SWFullScreenCover";
import {View} from "../../SWCore";

export function FullscreenCover() {
    return createComponent<View>(
        { render: function() { return <SWFullScreenCover view={this as View} />; } },
        {}
    )
        .render();
}