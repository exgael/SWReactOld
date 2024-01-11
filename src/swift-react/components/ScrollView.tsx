import createComponent from "../SWCore/SWElements/componentFactory";
import {ScrollViewComponent} from "../SWCore/SWTypes/Components";
import {SWScrollView} from "../SWCore/SWElements/SWElements";
import {layoutModifiers} from "../SWCore/SWModifiers/layout/layoutModifiers";
import {View} from "../SWCore";

export function ScrollView(...children: View[]): ScrollViewComponent {
    return createComponent<ScrollViewComponent>(
        {
            toJSX: function () {
                return <SWScrollView view={this as ScrollViewComponent}/>;
            }
        },

        {
            children
        },
        layoutModifiers
    );
}