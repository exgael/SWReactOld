import {VStack} from "../swift-react-ui";
import {Text} from "../swift-react-ui";


export function ContactMe() {
    return (
        VStack(

            Text("Yousra Chriette"),

            Text("Contact information"),

            Text("Phone: +213 555 555 555"),
            Text("Email: anonyme@gmail.com"),
            Text("Address: 1234 Street Name, City Name, Country"),
        )
            .frame({width: "100%"})
            .setNavigationTitle("Contact Me")
    )
}