import { Landing } from "./pages/Landing";
import { CurriculumVitae } from "./pages/CurriculumVitae";
import { ContactMe } from "./pages/ContactMe";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import { IoMail, IoMailOutline } from "react-icons/io5";
import {
    Content,
    NavigationLink,
    TabItem,
    TabView,
    VStack,
    Text
} from "./swift-react";

Content(
    TabView(
        TabItem(
                // Landing(),
                NestedView()
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
                NavigationLink(Text("View 1"), NestedView()),
                NavigationLink(Text("View 2"), ContactMe()
                    .setNavigationTitle("Contact Me")
                )
            )
        )
            .setTitle("Tab Item 3")
            .setIcon(IoMailOutline, IoMail)
    )
);


function NestedView() {
    return (
        NavigationLink(
            Text("View 2"),
            NavigationLink(Text("View 3"), Text("View 4")   .setNavigationTitle("View 4"))
        )
    )
}



