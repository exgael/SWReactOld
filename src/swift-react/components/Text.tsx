import {TextComponent} from "../SWCore/SWTypes/Components";
import createComponent from "../SWCore/SWElements/componentFactory";
import {SWText} from "../SWCore/SWElements/SWElements";
import {textModifiers} from "../SWCore/SWModifiers/text/textModifiers";
import React from "react";

export function Text(text: string): TextComponent {
    return createComponent<TextComponent>(
        { toJSX: function() { return (<SWText view={this as TextComponent} />); } },
        { text },
        textModifiers,
    )
        .textAlign("justify");
}

export function LargeTitle(string: string): TextComponent {
    return Text(string)
        .setAriaLabel("LargeTitle")
        .clampedFontSize("2rem", "6vw", "2.5rem")
        .fontWeight("bold");
}

export function Title(string: string): TextComponent {
    return Text(string)
        .setAriaLabel("Title")
        .clampedFontSize("1.5rem", "5vw", "2rem")
        .fontWeight("bold");
}

export function Headline(string: string): TextComponent {
    return Text(string)
        .setAriaLabel("Headline")
        .clampedFontSize("1.2rem", "4vw", "1.5rem")
        .fontWeight("bold");
}

export function Subheadline(string: string): TextComponent {
    return Text(string)
        .setAriaLabel("Subheadline")
        .clampedFontSize("1rem", "3.5vw", "1.25rem");
}

export function Body(string: string): TextComponent {
    return Text(string)
        .setAriaLabel("Body")
        .clampedFontSize("1rem", "3vw", "1.25rem");
}

export function Callout(string: string): TextComponent {
    return Text(string)
        .setAriaLabel("Callout")
        .clampedFontSize("0.9rem", "3vw", "1.1rem");
}

export function Footnote(string: string): TextComponent {
    return Text(string)
        .setAriaLabel("Footnote")
        .clampedFontSize("0.8rem", "2.5vw", "1rem");
}

export function Caption(string: string): TextComponent {
    return Text(string)
        .setAriaLabel("Caption")
        .clampedFontSize("0.75rem", "2vw", "0.9rem");
}
