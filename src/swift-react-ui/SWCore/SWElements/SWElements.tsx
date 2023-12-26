import React, {FC, useEffect, useRef, useState} from "react";
import View from "../SWTypes/View";

import {
    ButtonComponent, ForEachComponent, ShapeComponent, ScreenComponent,
    StackComponent,
    TextComponent
} from "../SWTypes/Components";


export const SWSpacer: React.FC<{ view: View }> = React.memo(
    ({ view }) => (
        <div style={view.style} {...view.events} />
    )
);

/**
 * SWRoundedRectangle renders a rounded rectangle shape within an SWView.
 * It applies specific styles and event handlers related to the rounded rectangle.
 *
 * @param {ShapeComponent} view - The RoundedRectangleComponent object containing style, events, and cornerRadius.
 */
export const SWRoundedRectangle: React.FC<{ view: ShapeComponent }> = React.memo(
    ({ view }) => {
        // Define rounded rectangle-specific styles or event overrides here
        const roundedRectangleStyle =  { /* ... */ };
        const roundedRectangleEvents = { /* ... */ };
        return (
            <SWView
                view={view}
                overrideStyles={roundedRectangleStyle}
                overrideEvents={roundedRectangleEvents}
                children={null}
            />
        )
    }
);

/**
 * SWForEach renders a list of components within an SWView, iterating over provided data.
 * It applies specific styles and event handlers for each item in the list.
 *
 * @param {ForEachComponent} view - The ForEachComponent object containing data, viewBuilder, style, and events.
 */
export const SWForEach: React.FC<{ view: ForEachComponent }> = React.memo(
    ({ view }) => {
        // Define foreach-specific styles or event overrides here
        const foreachStyle =  { /* ... */ };
        const foreachEvents = { /* ... */ };

        return (
            <SWView view={view} overrideStyles={foreachStyle} overrideEvents={foreachEvents}>
                {view.data && view.data.map((item: any, index: number) => (
                    <div key={generateObjectHash(item + index)}>
                        {view.viewBuilder(item, index).render()} { /* Render each item using the viewBuilder */ }
                    </div>
                ))}
            </SWView>
        )
    }
);

/**
 * SWScreen renders a screen of components made of ReactElement and View within a ReactElement.
 */
export const SWScreen: React.FC<{ view: ScreenComponent }> = React.memo(
    ({ view }) => (
        <div style={{ ...view.style, position: 'relative' }} {...view.events}>
            {view.children && view.children.map((child, index) => {
                if ('render' in child) {
                    // If the child is a View type, call its render method with a div wrapper for ZStack
                    return (
                        <div key={generateObjectHash(child, index)} style={{position: 'absolute'}}>
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
                    <div key={generateObjectHash(child)} style={{ position: 'absolute' }}>
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
                {view.children && view.children.map((child: View, index: number) => {
                    return (
                    <div key={generateObjectHash(child, index)}>
                        {child.render()}
                    </div>
                )})}
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


interface SWBackgroundWrapperProps {
    view: View;
    children: React.ReactNode;
}

const SWBackgroundWrapper: FC<SWBackgroundWrapperProps> = ({ view, children }) => {
    const RenderBackground: FC = () => {
        if (view.background) {
            // The backgroundStyle here is only necessary to position the background
            // within the parent container. Since view.background.render() handles
            // all styling, we should not apply any additional styling here.
            const backgroundPlacement: React.CSSProperties  = {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
                width: "100%",
                height: "100%",
            };

            return (
                <div style={backgroundPlacement}>
                    {view.background.render ? view.background.render() : null}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ position: 'relative', width:"100%", height:"100%" }}>
            <RenderBackground />
            {children}
        </div>
    );
};

const SWBackgroundWrapper3: React.FC<{
    view: View,
    children: React.ReactNode
}> = React.memo(
    ({
         view,
         children
     }) => {
    const renderBackgrounds = (currentView: View) => {
        let backgrounds = [];
        let zIndex = 0;
        while (currentView && currentView.background) {
            // Collect background elements with base styles
            backgrounds.push(
                <div
                    key={zIndex}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: zIndex,
                        width: "100%",
                        height: "100%",
                        ...currentView.background.style
                    }}
                >
                    {/* Render the background with its own styles */}
                </div>
            );
            currentView = currentView.background;
            zIndex -= 1;
        }
        return backgrounds.reverse(); // Render outermost background first
    };

    return (
        <div style={{ position: 'relative' }}>
            {renderBackgrounds(view)}
            {children}
        </div>
    );
});

/**
 * SWBackgroundWrapper is a component that renders a background behind its children.
 * It supports SwiftUI-like background functionality where the background can be another view.
 *
 * @param {View} view - The view object which may contain a background view.
 * @param {React.ReactNode} children - The child elements to render on top of the background.
 */
const SWBackgroundWrapper2: React.FC<{
    view: View,
    children: React.ReactNode
}> = React.memo(
    ({
          view,
          children
      }) => {

    // RenderBackground renders the background view if it is specified in the view object.
    // It covers the entire parent container, similar to SwiftUI's background modifier.
    const RenderBackground = () => {
        // Check if a background view is defined
        if (view.background !== undefined) {
            return (
                <div style={{ // APPLY BACKGROUND STYLES
                    position: 'absolute',       // Absolute positioning to overlay the background
                    top: 0,                     // Aligns the top edge of the background with the container
                    left: 0,                    // Aligns the left edge of the background with the container
                    right: 0,                   // Ensures the background extends to the right edge of the container
                    bottom: 0,                  // Ensures the background extends to the bottom edge of the container
                    zIndex: 0,                  // Places the background behind the content MIGHT NEED MORE TESTING
                    width: "100%",              // Ensures the background covers the full width of the container
                    height: "100%",             // Ensures the background covers the full height of the container
                    ...view.background.style    // Applies custom styles defined for the background
                }}
                 { // APPLY BACKGROUND EVENTS
                     ...view.background.events
                 }
                >
                    {/* Render the background view */}
                    {view.background.render && view.background.render()}
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
            {view.background && <RenderBackground />}  { /* Insert the rendered background */ }
            {children}            { /* Renders the children of the view */ }
        </div>
    );
});

function generateObjectHash(obj: Object, index?: number) {
    const str = JSON.stringify(obj);
    if (index) {
        return generateHash(str + index);
    }
    return generateHash(str);
}

function generateHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return hash.toString();
}
