import React from "react";
import createComponent from "../../SWCore/SWElements/componentFactory";
import {FullscreenCoverComponent} from "../../SWCore/SWTypes/Components";
import {SWFullScreenCover} from "../../SWCore/SWElements/SWModals/FullscreenCover/SWFullscreenCover";
import {View} from "../../SWCore";

export function FullscreenCover(show: View, onDismiss?: () => void): FullscreenCoverComponent {
    return createComponent<FullscreenCoverComponent>(
        { render: function() { return <SWFullScreenCover view={this as FullscreenCoverComponent} />; } },
        { show: show, onDismiss: onDismiss }
    )
}