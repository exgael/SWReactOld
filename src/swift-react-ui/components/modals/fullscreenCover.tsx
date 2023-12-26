import React from "react";
import createComponent from "../../SWCore/SWElements/componentFactory";
import {SWFullScreenCover} from "../../SWCore/SWElements/SWModals/FullscreenCover/SWFullScreenCover";
import {View} from "../../SWCore";
import {ModalComponent} from "../../SWCore/SWTypes/Components";

export function FullscreenCover() {
    return createComponent<ModalComponent>(
        { render: function() { return <SWFullScreenCover view={this as View} />; } },
        {}
    )
        .render()
}