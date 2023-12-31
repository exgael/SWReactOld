import {ForEachComponent, ScreenComponent} from "../SWCore/SWTypes/Components";
import createComponent from "../SWCore/SWElements/componentFactory";
import {SWForEach, SWScreen, SWView} from "../SWCore/SWElements/SWElements";
import {layoutModifiers} from "../SWCore/SWModifiers/layout/layoutModifiers";
import View from "../SWCore/SWTypes/View";
import React from "react";
import {CoreModifiers} from "../SWCore/SWModifiers/core/coreModifers";

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

type BViewComponent = View & CoreModifiers<BViewComponent> & {
    children: View;
};

export function BView(children: View): BViewComponent {
    return createComponent<BViewComponent>(
        { render: function() {
                return (
                    <SWView view={this as BViewComponent}>
                        {children.render()}
                    </SWView>
                )
            }},
        {}
    );
}



export function ForEach<T>(data: T[], viewBuilder: (item: T, index: number) => View): ForEachComponent {
    return createComponent<ForEachComponent>(
        { render: function() { return <SWForEach view={this as ForEachComponent} /> }},
        {
            data,
            viewBuilder,
            style: {
                display: "flex",
                position: "relative",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }
        },
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

