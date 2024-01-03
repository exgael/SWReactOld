import {AnimationComponent} from "../../SWCore/SWTypes/Components";
import {SWWithAnimation} from "../../SWCore/SWElements/SWAnimation/SWAnimation";
import {View} from "../../SWCore";
import createComponent from "../../SWCore/SWElements/componentFactory";

export function withAnimation(initial: any, animate: any, exit: any, transition: any) {
    return function(child: View): AnimationComponent {
        return createComponent<AnimationComponent>(
            { toJSX: function() { return (<SWWithAnimation view={this as AnimationComponent} />); } },
            { child, initial, animate, exit, transition },
        );
    };
}