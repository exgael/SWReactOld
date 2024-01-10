import createComponent from "../../SWCore/SWElements/componentFactory";
import {ButtonComponent} from "../../SWCore/SWTypes/Components";
import {SWMdOutlineMenuBook} from "../../SWCore/SWElements/SWIcons/MdOutlineMenuBook";

export function MdOutlineMenuBook(action: () => void): ButtonComponent {
    return createComponent<ButtonComponent>(
        {
            toJSX: function () {
                return <SWMdOutlineMenuBook view={this as ButtonComponent}/>;
            }
        },
        {action},
    )
}



