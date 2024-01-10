import React, {FC, ReactElement} from "react";
import View from "../SWTypes/View";

import {
    ButtonComponent, ForEachComponent, ShapeComponent, ScreenComponent,
    StackComponent,
    TextComponent, ScrollViewComponent, InputComponent
} from "../SWTypes/Components";
import {useTranslation} from "react-i18next";
import {useTheme} from "../SWProvider/useTheme";


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
                        {view.viewBuilder(item, index).toJSX()} { /* Render each item using the viewBuilder */ }
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

                // undefined check
                if (!child) {
                    return null;
                }

                if ('toJSX' in child) {
                    // If the child is a View type, call its render method with a div wrapper for ZStack
                    return (
                        <div key={generateObjectHash(child, index)} style={{position: 'absolute'}}>
                            {child.toJSX()}
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
 * SWScrollView renders a scrollable view of components.
 * It allows vertical scrolling for its children components.
 *
 * @param {ScrollViewComponent} view - The ScrollViewComponent object containing children and styles.
 */
export const SWScrollView: React.FC<{ view: ScrollViewComponent }> = React.memo(
    ({ view }) => {
        return (
            <div style={{ ...view.style }}>
                {view.children && view.children.map((child: View, index: number) => {
                    return <div key={`scroll-item-${generateObjectHash(child, index)}`}>{child.toJSX()}</div>;
                })}
            </div>
        )
    }
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
                        {child.toJSX()}
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
                        {child.toJSX()}
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
                    {view.label.toJSX()} {/* COMPONENT SPECIFIC PROPERTY */ }
                </button>
            </SWView >
        )
    }
);

/**
 * SWInput renders an input field within an SWView, applying input-specific styles and event handlers.
 *
 * @param {InputComponent} view - The InputComponent object containing style, events, and placeholder.
 */
export const SWInput: React.FC<{ view: InputComponent }> = React.memo(
    ({ view }) => {

        // Define input-specific styles or event overrides here
        const inputStyle =  { /* ... */ };
        const inputEvents = { /* ... */ };

        return (
            <SWView view={view} overrideStyles={inputStyle} overrideEvents={inputEvents}>
                <input
                    placeholder={view.placeholder} // COMPONENT SPECIFIC PROPERTY
                />
            </SWView>
        )
    }
);

/**
 * SWText renders text within an SWView, applying text-specific styles and event handlers.
 * It supports localization by checking the isLocal property.
 *
 * @param {TextComponent} view - The TextComponent object containing text, style, and events.
 */
export const SWText: React.FC<{ view: TextComponent }> = React.memo(
    ({ view }) => {

        const { themeColors } = useTheme();

        // Define text-specific styles or event overrides here
        const textStyle =  { color: themeColors?.primaryText };
        const textEvents = { /* ... */ };

        const { t } = useTranslation()

        return (
            <SWView view={view} overrideStyles={textStyle} overrideEvents={textEvents}>
                <span>
                    {view.isLocal ? t(view.text) : view.text} {/* COMPONENT SPECIFIC PROPERTY */ }
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
            <div
                id={view.id}
                key={view.key}
                ref={view.ref}
                className={view.classNames?.join(' ')}
                style={{...view.style, ...overrideStyles }} {...view.events} {...overrideEvents}>
                {children}
            </div>
        </SWBackgroundWrapper>
    )
);

export function SWReactElement(component: View, template: View ): ReactElement {
    return (
        <SWView view={component}>
            {template.toJSX()}
        </SWView>
    )
}

/**
 * SWBackgroundWrapper is a component that renders a background behind its children.
 * It supports SwiftUI-like background functionality where the background can be another view.
 *
 * @param {View} view - The view object containing style, events, and background information.
 * @param {React.ReactNode} children - The child elements to be rendered within the view.
 */
const SWBackgroundWrapper: FC<{
    view: View,
    children: React.ReactNode,
}> = React.memo(({ view, children }) => {



    const RenderBackground: FC = () => {
        if (view.background?.toJSX) {
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
                    {view.background.toJSX ? view.background.toJSX() : null}
                </div>
            );
        }
        return null;
    };

    if (!view.background?.toJSX) {
        return (
            children as ReactElement
        );
    }

    return (
        <div style={{ position: 'relative', width:"100%", height:"100%" }}>
            <RenderBackground />
            {children}
        </div>
    );
});

function generateObjectHash(obj: Object, index?: number) {
    let str;
    try {
        str = JSON.stringify(obj);
    } catch (e) {
        str = Math.random().toString()
    }

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
