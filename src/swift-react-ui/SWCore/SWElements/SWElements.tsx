import React from "react";
import {ButtonComponent, ForEachComponent, ScreenComponent, StackComponent, TextComponent} from "../SWTypes/Components";
import View from "../SWTypes/View";

export const SWText: React.FC<{ view: TextComponent }> = React.memo(
    // Lambda function to memoize
    ({view}) => (
        <span style={view.style} {...view.events}>
            {view.text}
        </span>
    )
);

export const SWButton: React.FC<{ view: ButtonComponent }> = React.memo(
    ({ view }) => (
        <button style={view.style} {...view.events} onClick={view.action}>
            {view.label.render()}
        </button>
    )
);

export const SWStack: React.FC<{ view: StackComponent }> = React.memo(
    ({ view }) => (
        <div style={view.style} {...view.events}>
            {view.children && view.children.map((child: View, index: number) => {
                return (
                    <div key={index}>
                        {child.render()}
                    </div>
                );
            })}
        </div>
    )
);

export const SZStack: React.FC<{ view: StackComponent }> = React.memo(
    ({ view }) => (
        <div style={view.style} {...view.events}>
            {view.children && view.children.map((child: View, index: number) => (
                <div key={index} style={{ position: 'absolute' }}>
                    {child.render()}
                </div>
            ))}
        </div>
    )
);


/**
 * Specialized Layout Component to bridge the gap between React and Sw
 */
export const SWScreen2: React.FC<{ view: ScreenComponent }> = React.memo(
    ({ view }) => (
        <div style={view.style} {...view.events}>
            {view.children && view.children.map((child, index) => {
                if ('render' in child) {
                    // If the child is a View type, call its render method directly without extra div wrapper
                    return (
                        <React.Fragment key={generateObjectHash(child)}>
                            {child.render()}
                        </React.Fragment>
                    );
                } else {
                    // If the child is a React.ReactElement, render it directly
                    return (
                        <React.Fragment key={index}>
                            {child}
                        </React.Fragment>
                    );
                }
            })}
        </div>
    )
);

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


export const SWForEach: React.FC<{ view: ForEachComponent }> = React.memo(
    ({ view }) => (
        <div style={view.style} {...view.events}>
            {view.data && view.data.map((item: any, index: number) => (
                <div key={generateObjectHash(item + index)}>
                    {view.viewBuilder(item, index).render()}
                </div>
            ))}
        </div>
    )
)

export const SWView: React.FC<{ view: View }> = React.memo(
    ({ view } ) => (
        <div style={view.style} {...view.events} />
    )
)

function generateHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char + Math.random() + Math.random();
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
}

function generateObjectHash(obj: Object) {
    const str = JSON.stringify(obj);
    return generateHash(str);
}