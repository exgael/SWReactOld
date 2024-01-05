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
    Text, Color, HStack
} from "./swift-react";
import {withAnimation} from "./swift-react/components/animation/withAnimation";
import {Input} from "./swift-react/components/Input";

// const largeTitleAnimation = {
//     initial: {
//         opacity: 1,
//         color: "#000" // Initial color, e.g., black
//     },
//     animate: {
//         opacity: 0,
//         color: "#f00" // Animate to a different color, e.g., red
//     },
//     exit: {
//         opacity: 1,
//         color: "#00f" // Exit color, e.g., blue
//     },
//     transition: { duration: 0.2 }
// };


// const largeTitleAnimation = {
//     initial: {
//         opacity: 1,
//         color: "#000" // Initial color
//     },
//     animate: {
//         opacity: [1, 0, 1], // Blinking effect
//         color: ["#f00", Color.olive], // Color change
//         transition: {
//             duration: 1, // Very short duration for an abrupt change
//             times: [0, 0.2, 0.4, 0.6, 0.8, 1], // Timing for each opacity change
//             repeat: Infinity, // Repeat the animation indefinitely
//             repeatDelay: 0 // Delay between each repeat cycle
//         }
//     },
//     exit: {
//         opacity: 1,
//         color: "#00f" // Exit color
//     },
//     transition: { duration: 1 }
// };

// const largeTitleAnimation = {
//     initial: {
//         opacity: 1,
//         color: "#000" // Initial color is black
//     },
//     animate: {
//         opacity: 1, // Keeping opacity constant at 1
//         color: ["#f00", "#000", "#f00", "#000"], // Alternating between red and black
//         transition: {
//             duration: 4, // Total duration for one full cycle (red to black to red to black)
//             times: [0, 0.25, 0.5, 0.75, 1], // Timing for each color change
//             repeat: Infinity, // Repeat the animation indefinitely
//             repeatDelay: 0 // No delay between each repeat cycle
//         }
//     },
//     exit: {
//         opacity: 1,
//         color: "#00f" // Exit color is blue
//     },
//     transition: { duration: 5 }
// };

const largeTitleAnimation = {
    initial: {
        opacity: 1,
        color: "#000" // Initial color is black
    },
    animate: {
        opacity: 1, // Keeping opacity constant at 1
        color: ["#000", "#f00", "#000", "#f00", "#000"], // Starting and ending with black
        transition: {
            duration: 4, // Total duration for one full cycle
            times: [0, 0.25, 0.5, 0.75, 1], // Timing for each color change
            repeat: Infinity, // Repeat the animation indefinitely
            repeatDelay: 0 // No delay between each repeat cycle
        }
    },
    exit: {
        opacity: 1,
        color: "#00f" // Exit color is blue
    },
    transition: { duration: 5 }
};



Content(
    //
    // VStack(
    //
    //     withAnimation(
    //         largeTitleAnimation.initial,
    //         largeTitleAnimation.animate,
    //         largeTitleAnimation.exit,
    //         largeTitleAnimation.transition,
    //     ) (
    //         Text("Hello World")
    //     )
    //
    //     ,
    //
    //     Text("Hello World")
    //         .background(Color.olive)
    //         .fontSize("20px")
    //     ,
    //     HStack(
    //         Text("Hello World")
    //             .fontSize("20px")
    //         ,
    //         Text("Hello World")
    //             .fontSize("20px")
    //     )
    //         .gap("20px")
    //         .crossAxisAlignment("flex-start")
    //         .frame({width: "100vw", height: "100vh"})
    //
    //
    // )
    //     .crossAxisAlignment("flex-start")
    //     .gap("30px")

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
                ),
                Input("Name", ( text: string ) => console.log(text))
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



