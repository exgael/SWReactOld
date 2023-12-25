import {ForEachComponent, ScreenComponent} from "../SWCore/SWTypes/Components";
import createComponent from "../SWCore/SWElements/componentFactory";
import {SWForEach, SWScreen} from "../SWCore/SWElements/SWElements";
import {layoutModifiers} from "../SWCore/SWModifiers/layout/layoutModifiers";
import View from "../SWCore/SWTypes/View";
import React from "react";

export function Group(...children: View[]): View {
    return {
        render: () => (
            <div>
                {children.map((child, index) => child.render())}
            </div>
        ),
        style: {},
        events: {},
        properties: {},
    };
}

export function ForEach<T>(data: T[], viewBuilder: (item: T, index: number) => View): View {
    return createComponent<ForEachComponent>(
        { render: function() { return <SWForEach view={this as ForEachComponent} /> }},
        { data, viewBuilder },
        layoutModifiers
    );
}


type ViewBuilderBlock = (conditions: Record<string, any>) => View | View[];

export function viewBuilder(conditions: Record<string, any>, block: ViewBuilderBlock): React.ReactElement[] {
    const views = block(conditions);
    if (Array.isArray(views)) {
        return views.map(view => view.render());
    } else {
        return [views.render()];
    }
}

