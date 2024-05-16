import createComponent from "../SWCore/SWElements/componentFactory";
import {ShapeComponent} from "../SWCore/SWTypes/Components";
import {SWRoundedRectangle} from "../SWCore/SWElements/SWElements";

export function RoundedRectangle(cornerRadius: string): ShapeComponent {
    return createComponent<ShapeComponent>(
        {
            toJSX: function () {
                return <SWRoundedRectangle view={this as ShapeComponent}/>;
            }
        },
        {style: {borderRadius: cornerRadius}},
    );
}