import {Button, Color, HStack, NavigationLink, RoundedRectangle, Spacer, View, ZStack} from "../swift-react";
import {ForEach, Text, VStack} from "../swift-react";
import {sheet} from "../swift-react/SWCore/SWElements/SWModals/Sheet/SheetStore";
import {alert} from "../swift-react/SWCore/SWElements/SWModals/Alert/AlertStore";
import { ScrollView } from "../swift-react/components/ScrollView";
import { LinearGradient } from "../swift-react/SWCore";
export function Landing(): View {
    return (
        VStack(

            Text("Vertical Satck View"),


            Text("Blur, Blend, ZStack"),
            HStack(
            RoundedRectangle("20px")
                .frame({height: "100px", width: "100px"})
                .blendMode("exclusion")
                .offset("20px", "0px")
                .background(Color.red),
                RoundedRectangle("20px")
                .frame({height: "100px", width: "100px"})
                .background(Color.green)
                ,

                ZStack(
                    Text("I AM UNDER")
                    .offset("40px", "0px")
                    .foregroundStyle(Color.blue)
                    ,
                RoundedRectangle("20px")
                    .background(Color.blue)
                    .backgroundBlur(5)
                    .frame({height: "100px", width: "100px"})
                )
                .backgroundBlur(5)
                .blendMode("overlay")
                .frame({height: "100px", width: "100px"})
                .offset("-20px", "0px")
                ,
            ),
            Spacer(),
            Text("Scrolling View"),
            ScrollView(
                RoundedRectangle("50%")
                .frame({height: "20px", width: "20px"})
                .background(Color.fuchsia),
                RoundedRectangle("50%")
                .frame({height: "20px", width: "20px"})
                .background(Color.green),
                RoundedRectangle("30%")
                .frame({height: "20px", width: "20px"})
                .background(Color.hex("#dedcd5")),
                RoundedRectangle("30%")
                .frame({height: "20px", width: "20px"})
                .background(Color.fuchsia),
                RoundedRectangle("30%")
                .frame({height: "20px", width: "20px"})
                .background(Color.green),
                RoundedRectangle("50%")
                .frame({height: "20px", width: "20px"})
                .background(Color.fuchsia),
                RoundedRectangle("50%")
                .frame({height: "20px", width: "20px"})
                .background(Color.green),
                RoundedRectangle("30%")
                .frame({height: "20px", width: "20px"})
                .background(Color.hex("#dedcd5")),
                RoundedRectangle("30%")
                .frame({height: "20px", width: "20px"})
                .background(Color.fuchsia),
                RoundedRectangle("30%")
                .frame({height: "20px", width: "20px"})
                .background(Color.green),
            )
       
            .frame({height: "100px", width: "100%"})
            ,
       
            HStack(

                Text("Horizontal stack")
                    .absolutePosition("100px", "30px")
                ,

                RoundedRectangle("20px")
                .frame({height: "10px", width: "10px"})
                .debugBorder()
                .background(Color.white),


                RoundedRectangle("20px")
                    .frame({height: "40px", width: "40px"})
                    .debugBorder()
                    .backgroundBlur(10)
                    .opacity(0.3)
                    .absoluteCenter()
                    .background(Color.green),
                RoundedRectangle("50%")
                    .frame({height: "30px", width: "30px"})
                    .debugBorder()
                    .background(Color.green),
            )
            .debugBorder()
            .frame({height: "100px", width: "100px"})
            ,
            Text("Gradient Top to bottom")
            .foregroundStyle(LinearGradient([Color.red, Color.green, Color.blue], "bottom"))
            .frame({height: "20px", width: "200px"}),
            Text("Gradient Leading to trailing")
            .foregroundStyle(LinearGradient([Color.red, Color.green, Color.blue], "leading"))
            .frame({height: "20px", width: "200px"})
        )
            .gap("10px")
            .frame({height: "100%", width: "100%"})
            .debugBorder()
            .setNavigationTitle("Shapes")
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
