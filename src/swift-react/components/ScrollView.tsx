import createComponent from "../SWCore/SWElements/componentFactory";
import {ScrollViewComponent} from "../SWCore/SWTypes/Components";
import {SWScrollView} from "../SWCore/SWElements/SWElements";
import {layoutModifiers} from "../SWCore/SWModifiers/layout/layoutModifiers";
import {View} from "../SWCore";

export function ScrollView(...children: View[]): ScrollViewComponent {
    return createComponent<ScrollViewComponent>(
        {
            toJSX: function() {
                return <SWScrollView view={this as ScrollViewComponent} />;
            }
        },

        {
            children,
            style: {
                display: "flex",
                overflowY: "scroll", // Enables scrolling
                flexDirection: "column",
                height: "100%", // Enables scrolling
                width: "100%", // Enables scrolling
                // Add other styles as needed
            }
        },
        layoutModifiers
    );
}