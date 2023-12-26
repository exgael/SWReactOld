import React from "react";
import View from "../SWTypes/View";

import {
    ButtonComponent, ScreenComponent,
    StackComponent,
    TextComponent
} from "../SWTypes/Components";

export const SWScreen: React.FC<{ view: ScreenComponent }> = React.memo(
    ({ view }) => (
        <div style={{ ...view.style, position: 'relative' }} {...view.events}>
            {view.children && view.children.map((child, index) => {
                if ('render' in child) {
                    // If the child is a View type, call its render method with a div wrapper for ZStack
                    return (
                        <div key={generateObjectHash(child)} style={{position: 'absolute'}}>
                            {child.render()}
                        </div>
                    );
                } else {
                    // If the child is a React.ReactElement, render it within a div for ZStack
                    return (
                        <div key={index} style={{position: 'absolute'}}>
                            {child}
                        </div>
                    );
                }
            })}
        </div>
    )
);

/**
 * SZStack renders a stack of components within an SWView in a Z-axis layout.
 * Each child is positioned absolutely to overlap, creating a layered effect.
 *
 * @param {StackComponent} view - The StackComponent object containing children, style, and events.
 */
export const SZStack: React.FC<{ view: StackComponent }> = React.memo(
    ({ view }) => {

        // Define stack-specific styles or event overrides here
        const stackStyle =  { /* ... */ };
        const stackEvents = { /* ... */ };

        return (
            <SWView view={view} overrideStyles={stackStyle} overrideEvents={stackEvents}>
                {view.children && view.children.map((child: View, index: number) => (
                    <div key={index} style={{ position: 'absolute' }}>
                        {child.render()}
                    </div>
                ))}
            </SWView>
        )
    }
);

/**
 * SWStack renders a stack of components within an SWView.
 * It applies stack-specific styles and event handlers and arranges its children vertically or horizontally.
 *
 * @param {StackComponent} view - The StackComponent object containing children, style, and events.
 */
export const SWStack: React.FC<{ view: StackComponent }> = React.memo(
    ({ view }) => {

        // Define stack-specific styles or event overrides here
        const stackStyle =  { /* ... */ };
        const stackEvents = { /* ... */ };

        return (
            <SWView view={view} overrideStyles={stackStyle} overrideEvents={stackEvents}>
                {view.children && view.children.map((child: View, index: number) => (
                    <div key={index}>
                        {child.render()}
                    </div>
                ))}
            </SWView>
        )
    }
);

/**
 * SWButton renders a button within an SWView, applying button-specific styles and event handlers.
 *
 * @param {ButtonComponent} view - The ButtonComponent object containing style, events, action, and label.
 */
export const SWButton: React.FC<{ view: ButtonComponent }> = React.memo(
    ({ view }) => {

        // Define button-specific styles or event overrides here
        const buttonStyle =  { /* ... */ };
        const buttonEvents = { /* ... */ };

        return (
            <SWView view={view} overrideStyles={buttonStyle} overrideEvents={buttonEvents}>
                <button
                    onClick={view.action} // COMPONENT SPECIFIC PROPERTY
                >
                    {view.label.render()} {/* COMPONENT SPECIFIC PROPERTY */ }
                </button>
            </SWView >
        )
    }
);

/**
 * SWText renders text within an SWView, applying text-specific styles and event handlers.
 *
 * @param {TextComponent} view - The TextComponent object containing text, style, and events.
 */
export const SWText: React.FC<{ view: TextComponent }> = React.memo(
    ({ view }) => {

        // Define text-specific styles or event overrides here
        const textStyle =  { /* ... */ };
        const textEvents = { /* ... */ };

        return (
            <SWView view={view} overrideStyles={textStyle} overrideEvents={textEvents}>
                <span>
                    {view.text} {/* COMPONENT SPECIFIC PROPERTY */ }
                </span>
            </SWView>
        )
    }
);

/**
 * SWView is a generic container component that applies common styles and event handlers.
 * It wraps its children within SWBackgroundWrapper to provide background functionality.
 * It allows for overriding styles and events specific to child components.
 *
 * @param {View} view - The view object containing style, events, and background information.
 * @param {React.ReactNode} children - The child elements to be rendered within the view.
 * @param {Record<string, any>} overrideStyles - Additional styles to be applied to the view.
 * @param {Record<string, any>} overrideEvents - Additional event handlers to be applied to the view.
 */
export const SWView: React.FC<{
    view: View,
    children: React.ReactNode,
    overrideStyles?: Record<string, any>,
    overrideEvents?: Record<string, any>
}> = React.memo(
    ({
         view,
         children,
         overrideStyles = {},
         overrideEvents= {}
    }) => (

        <SWBackgroundWrapper view={view}>
            <div style={{...view.style, ...overrideStyles }} {...view.events} {...overrideEvents}>
                {children}
            </div>
        </SWBackgroundWrapper>
    )
);

/**
 * SWBackgroundWrapper is a component that renders a background behind its children.
 * It supports SwiftUI-like background functionality where the background can be another view.
 *
 * @param {View} view - The view object which may contain a background view.
 * @param {React.ReactNode} children - The child elements to render on top of the background.
 */
const SWBackgroundWrapper: React.FC<{
    view: View,
    children: React.ReactNode
}> = ({
    view,
    children
}) => {

    // RenderBackground renders the background view if it is specified in the view object.
    // It covers the entire parent container, similar to SwiftUI's background modifier.
    const RenderBackground = () => {
        // Check if a background view is defined
        if (view.background) {
            return (
                <div style={{ // APPLY BACKGROUND STYLES
                    position: 'absolute',       // Absolute positioning to overlay the background
                    top: 0,                     // Aligns the top edge of the background with the container
                    left: 0,                    // Aligns the left edge of the background with the container
                    right: 0,                   // Ensures the background extends to the right edge of the container
                    bottom: 0,                  // Ensures the background extends to the bottom edge of the container
                    zIndex: -1,                 // Places the background behind the content
                    width: "100%",              // Ensures the background covers the full width of the container
                    height: "100%",             // Ensures the background covers the full height of the container
                    ...view.background.style    // Applies custom styles defined for the background
                }}
                { // APPLY BACKGROUND EVENTS
                    ...view.background.events
                }
                >
                    {view.background.render && view.background.render()} // Renders the background content
                </div>
            );
        }
        return null; // Returns null if no background is defined
    };

    return (
        <div style={{ // RELATIVE POSITIONING - Anchor for Absolutely Positioned Background
            position: 'relative'
        }}
        >
            <RenderBackground />  { /* Insert the rendered background */ }
            {children}            { /* Renders the children of the view */ }
        </div>
    );
};

function generateObjectHash(obj: Object) {
    const str = JSON.stringify(obj);
    return generateHash(str);
}

function generateHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char + Math.random() + Math.random();
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
}