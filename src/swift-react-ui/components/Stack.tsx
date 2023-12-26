import View from "../SWCore/SWTypes/View";
import {SpacerComponent, StackComponent} from "../SWCore/SWTypes/Components";
import createComponent from "../SWCore/SWElements/componentFactory";
import {SWSpacer, SWStack, SZStack} from "../SWCore/SWElements/SWElements";
import {layoutModifiers} from "../SWCore/SWModifiers/layout/layoutModifiers";
import React from "react";

export function ZStack(...children: View[]): StackComponent {
    return createComponent<StackComponent>(
        {
            render: function() {
                return <SZStack view={this as StackComponent} />;
            }
        },

        {
            children,
            style: {
                display: "flex",
                position: "relative",
                flexDirection: "column",
                justifyContent: "center", // Main axis
                alignItems: "center"
            }
        },
        layoutModifiers
    );
}


type StackOptions = {
    alignment?: // MAIN AXIS
    /** Items are packed toward the start of the flex direction. */
        | "flex-start"
        /** Items are packed toward the end of the flex direction. */
        | "flex-end"
        /** Items are centered along the line. */
        | "center"
        /** Items are evenly distributed in the line. */
        | "space-between"
        /** Items are evenly distributed in the line with equal space around them. */
        | "space-around";
    gap?: string;
};

// Overload definitions
export function VStack(stackOptions: StackOptions): (...children: View[]) => StackComponent;
export function VStack(...children: View[]): StackComponent;
export function VStack(...args: any[]): any {
    // Check if the first argument is an options object
    if (args.length == 1 && typeof args[0] === 'object') {
        const options: StackOptions = args[0];
        // Return a function that accepts children
        return (...children: View[]) => createStack('column', options)(...children);
    } else {
        // Use default options if only children are provided
        const defaultOptions = { alignment: 'center', gap: '0px' };
        return createStack('column', defaultOptions as StackOptions)(...args as View[]);
    }
}

// Overload definitions
export function HStack(stackOptions: StackOptions): (...children: View[]) => StackComponent;
export function HStack(...children: View[]): StackComponent;
export function HStack(...args: any[]): any {
    // Check if the first argument is an options object
    if (args.length == 1 && typeof args[0] === 'object') {
        const options: StackOptions = args[0];
        // Return a function that accepts children
        return (...children: View[]) => createStack('row', options)(...children);
    } else {
        // Use default options if only children are provided
        const defaultOptions = { alignment: 'center', gap: '0px' };
        return createStack('row', defaultOptions as StackOptions)(...args as View[]);
    }
}

export const Spacer = ({ flexGrow = 1, flexShrink = 1, flexBasis = 'auto' } = {}): SpacerComponent => createComponent<SpacerComponent>(
    {
        render: function() {
            return <SWSpacer view={this as SpacerComponent} />;
        }
    },
    {
        style: {
            flexGrow,
            flexShrink,
            flexBasis
        }
    },
);

function createStack(flexDirection: 'row' | 'column', options: StackOptions = {}) {
    return (...children: View[]): StackComponent => {
        const { alignment = 'center', gap = '0px' } = options;

        return createComponent<StackComponent>(
            {
                render: function() {
                    return <SWStack view={this as StackComponent} />;
                }
            },

            {
                children,
                style: {
                    display: "flex",
                    position: "relative",
                    flexDirection: flexDirection,
                    justifyContent: alignment, // Main axis
                    alignItems: "center"
                }
            },
            layoutModifiers
        );
    };
}
