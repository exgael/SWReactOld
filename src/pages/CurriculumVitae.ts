import {HStack, Spacer, VStack} from "../swift-react-ui";
import {Text} from "../swift-react-ui";


export function CurriculumVitae() {
    return (
        HStack(
            LeftSection(),
            CenterSection(),
            RightSection(),
        )
            .frame({width: "100%"})
            .setNavigationTitle("Curriculum Vitae")
    )
}

function LeftSection() {
    return (
        VStack(
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
        )
    )
}

function RightSection() {
    return (
        VStack(
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
        )
    )
}

function CenterSection() {
    return (
        VStack(
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Lorem ipsum dolor sit amet, consectetur adipiscin elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo."),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
            Text("Yousra Chriette"),
        )
    )
}