import {InputComponent} from "../SWCore/SWTypes/Components";
import createComponent from "../SWCore/SWElements/componentFactory";
import {SWInput} from "../SWCore/SWElements/SWElements";
import React from "react";

export function Input(value: string, onChange: (value: string) => void, placeholder?: string): InputComponent {
    return createComponent<InputComponent>(
        {
            toJSX: function () {
                return (<SWInput view={this as InputComponent}/>);
            }
        },
        {value, onChange, placeholder},
    )
}