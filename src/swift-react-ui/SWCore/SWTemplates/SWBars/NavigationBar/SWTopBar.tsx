import React, {FC} from 'react';
import { observer } from 'mobx-react';
import { View, Color } from '../../../SWTypes';
import {Title, VStack} from "../../../../components";

export const SWTopBar: FC<{ view: View }> = observer(({ view }) => {
    const appBarLayout = VStack({alignment: "flex-end"})(
        Title("Yousra Chriette")
            .foregroundStyle(Color.black)
            .padding({bottom:"1vh"})
    )
        .frame({ width: "100%" })
        .foregroundStyle(Color.white)
        .background(Color.rgba(150, 150, 150, 0.5))
        .setClassName(["glass", "top-bar"])

    return (
            <div style={view.style} {...view.events}>
                {appBarLayout.render()}
            </div>
    );
});

export default SWTopBar;
