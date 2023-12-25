import {TextComponent} from "../SWCore/SWTypes/Components";
import createComponent from "../SWCore/SWElements/componentFactory";
import {SWText} from "../SWCore/SWElements/SWElements";
import {textModifiers} from "../SWCore/SWModifiers/text/textModifiers";
import React from "react";

export function Text(text: string): TextComponent {
    return createComponent<TextComponent>(
        { render: function() { return (<SWText view={this as TextComponent} />); } },
        {
            text,
            style: {
                boxSizing: "border-box",
            }
        },
        textModifiers,
    );
}

export function LargeTitle(string: string): TextComponent {
    return Text(string)
        .clampedFontSize("2rem", "6vw", "2.5rem")
        .fontWeight("bold");
}

export function Title(string: string): TextComponent {
    return Text(string)
        .clampedFontSize("1.5rem", "5vw", "2rem")
        .fontWeight("bold");
}

export function Headline(string: string): TextComponent {
    return Text(string)
        .clampedFontSize("1.2rem", "4vw", "1.5rem")
        .fontWeight("bold");
}

export function Subheadline(string: string): TextComponent {
    return Text(string)
        .clampedFontSize("1rem", "3.5vw", "1.25rem");
}

export function Body(string: string): TextComponent {
    return Text(string)
        .clampedFontSize("1rem", "3vw", "1.25rem");
}

export function Callout(string: string): TextComponent {
    return Text(string)
        .clampedFontSize("0.9rem", "3vw", "1.1rem");
}

export function Footnote(string: string): TextComponent {
    return Text(string)
        .clampedFontSize("0.8rem", "2.5vw", "1rem");
}

export function Caption(string: string): TextComponent {
    return Text(string)
        .clampedFontSize("0.75rem", "2vw", "0.9rem");
}
