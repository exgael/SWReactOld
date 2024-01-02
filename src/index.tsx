import {Landing} from "./pages/Landing";
import {CurriculumVitae} from "./pages/CurriculumVitae";
import {ContactMe} from "./pages/ContactMe";
import { IoIosHome } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
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
            VStack({})(
                Landing(),
                NestedView()
            )
        )
            .setTitle("Home")
            .setIcon(IoIosHome)
        ,

        TabItem(
            CurriculumVitae()
        )
            .setTitle("Tab Item 2")
            .setIcon(IoIosPerson)
        ,

        TabItem(
            VStack(
                NavigationLink(Text("View 1"), NestedView()),
                NavigationLink(Text("View 2"), ContactMe())
            )
        )
            .setTitle("Tab Item 3")
            .setIcon(IoIosMail)
    )
);


function NestedView() {
    return (
        NavigationLink(
            Text("View 2"),
            NavigationLink(Text("View 3"), Text("View 4"))
        )
    )
}



