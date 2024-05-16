import { CurriculumVitae } from "./pages/CurriculumVitae";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import { IoMail, IoMailOutline } from "react-icons/io5";
import {
    Content,
    NavigationLink,
    TabItem,
    TabView,
    VStack,
    Text,
    Color,
} from "./swift-react";
import {Input} from "./swift-react/components/Input";
import { Landing } from "./pages/Landing";

Content(
    TabView(
        TabItem(
            Landing()
        )
            .setTitle("Home")
            .setIcon(IoHomeOutline, IoHome)
        ,

        TabItem(
            CurriculumVitae()
        ) 
            .setTitle("CV")
            .setIcon(IoPersonOutline, IoPerson)
        ,

        TabItem(
            VStack(
                NavigationLink(Text("Nav Link to some View")
                    .border({width: "2px", style: "groove", color: Color.fuchsia, side: "bottom"})
                    .foregroundStyle(Color.blue)
                , 
                Landing()
            ),
                Input("Name", ( text: string ) => console.log(text))
            )
            .gap("20px")
        )
            .setTitle("Nav and Input")
            .setIcon(IoMailOutline, IoMail)
    )
);



