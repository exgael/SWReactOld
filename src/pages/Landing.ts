import {Button, Color, RoundedRectangle, Spacer, View} from "../swift-react-ui";
import {ForEach, Text, VStack} from "../swift-react-ui";
import {sheet} from "../swift-react-ui/SWCore/SWElements/SWModals/Sheet/SheetStore";
import {alert} from "../swift-react-ui/SWCore/SWElements/SWModals/Alert/AlertStore";
export default function Landing(): View {
    return (
        VStack({alignment: "center", gap: "10px" })(
            EducationSection(),
            Spacer(),
            ExperienceSection(),
            Spacer(),

            VStack({alignment: "flex-start", gap: "10px" })(
                Text("Contact Me")
                    .font("MerryWeather", "30px")
                    .foregroundStyle(Color.black)
                ,
                Text("Email"),
                Button(
                    () => {},
                    Text("Show Fullscreen")
                ),
                Button(
                    () => alert.show("Alert Title", "Alert Message"),
                    Text("Show Alert")
                ),
                Button(
                    () => sheet.show(Text("Sheet Title"), () => console.log("Sheet dismissed")),
                    Text("Show Sheet")
                ),
            )
                .frame({height: "100%", width: "100%"})

                .background(
                    RoundedRectangle( "20px" )
                        .frame({width: "100%", height: "100%"})
                        .border({width: "5px", style:"solid" , color: Color.black})
                        .opacity(1)
                )
        )
            .frame({height: "100%", width: "100%"})
            .background(Color.hex("#dedcd5"))
            .setNavigationTitle("Landing Page")
    );
}

function EducationSection(): View {
    return VStack(
        Text('Education')
            .font("MerryWeather", "30px")
            .foregroundStyle(Color.olive)
        ,

        ForEach(
            [
                "201x-202x: Master's degree in Management, University of Strasbourg, Strasbourg, France",
                "201x-201x: Bachelor's degree in Economic Science, University of Strasbourg, Strasbourg, France"
            ],
            (item: string) => Text(item)
        )
    )
}

function ExperienceSection(): View {
    return VStack(

        Text('Experience')
            .font("MerryWeather", "30px")
            .foregroundStyle(Color.olive)
        ,

        ForEach(
            [
                "2020-2021: Internship at the xxxx xxxx xxxxx",
                "2019-2020: Internship at the xxx xxxxx xxx"
            ],
            (item: string) => Text(item)
        )
    )
}
