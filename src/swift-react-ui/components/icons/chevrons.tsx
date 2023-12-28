import {View} from "../../SWCore";
import createComponent from "../../SWCore/SWElements/componentFactory";
import {ButtonComponent, TextComponent} from "../../SWCore/SWTypes/Components";
import {SWChevronBack} from "../../SWCore/SWElements/SWNavigation/SWNavElement";

export function ChevronBack(action: () => void): ButtonComponent {
    return createComponent<ButtonComponent>(
        { render: function() { return <SWChevronBack view={this as ButtonComponent}/>; } },
                {action},
    )
}



