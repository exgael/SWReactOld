import React, {FC} from 'react';
import { observer } from 'mobx-react';
import topBarStore from './TopBarStore';
import { View, Color } from '../../../SWTypes';
import { HStack, Spacer, Text } from "../../../../components";
import {useNavigate} from "../../../SWProvider/Navigation";
import { ChevronBack } from "../../../../components/icons/chevrons";

export const SWTopBar: FC<{ view: View }> = observer(({ view }) => {

    const { goBack } = useNavigate();
    const titleText = Text(topBarStore.title);
    const appBarLayout = HStack(
        ChevronBack( () => goBack()),
        Spacer(),
        topBarStore.isVisible ? titleText : Text(""),
        Spacer(),
    )
        .frame({ width: "100%", height: "65px" })
        .background(Color.hex("#333"))
        .foregroundStyle(Color.white)
        .render();

    return (
        <div style={view.style} {...view.events}>
            {appBarLayout}
        </div>
    );
});

export default SWTopBar;
