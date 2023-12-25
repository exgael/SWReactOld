import {Button, Color, RoundedRectangle, Spacer, View} from "../swift-react-ui";
import {ForEach, Text, VStack} from "../swift-react-ui";
import {fullscreenCover} from "../swift-react-ui/SWCore/SWElements/SWModals/FullscreenCover/FullscreenCoverStore";
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
                    () => fullscreenCover.show(Text("Fs")),
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
                .background(
                    RoundedRectangle()
                        .background(Color.olive)
                        .blur(2)
                )
        )
            .frame({height: "100%"})
            .crossAxisAlignment("center")
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
                "2019-2021: Master's degree in Computer Science, University of Sciences and Technology Houari Boumediene, Algiers, Algeria",
                "2016-2019: Bachelor's degree in Computer Science, University of Sciences and Technology Houari Boumediene, Algiers, Algeria"
            ],
            (item: string) => Text(item)
        )
    )
        .crossAxisAlignment("center")
}

function ExperienceSection(): View {
    return VStack(

        Text('Experience')
            .font("MerryWeather", "30px")
            .foregroundStyle(Color.olive)
        ,

        ForEach(
            [
                "2020-2021: Internship at the Algerian Space Agency",
                "2019-2020: Internship at the Algerian Space Agency"
            ],
            (item: string) => Text(item)
        )
    )
        .crossAxisAlignment("center")
}
