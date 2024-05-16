# SWReact

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

To install dependencies, run:
```sh
npm install
```

## Running the Server

To launch the server, use:
```sh
npm start
```

Open the server URL on an iOS simulator or iPhone and install the app.

<div align="center">
      <img src="https://github.com/exgael/TempSW/assets/110360316/e6c4f216-6158-4128-9def-be39d1689ff6" width="200" /> 
</div>

## Overview

It is still under development.

SWReact is a library for static content. It allows the use of reactive elements, but requires the use of React states for full reactivity. This library is heavily inspired by the verbosity of SwiftUI, aiming to achieve similar expressiveness in React, minus the reactivity. However, necessary hooks are provided to build reactive SWComponents, though it requires a bit more work.

### Example

The following code demonstrates the use of View components:
```ts
VStack(
    Text("VStack")
        .foregroundStyle(LinearGradient(
            [Color.blue, Color.hex("#dedcd5")], 
            "leading")
        ),
    RoundedRectangle("10%")
        .frame({width: "50px", height: "50px"})
        .background(Color.antiquewhite.opacity(0.3))
        .background(
            Text("Blured Hello")
                .absoluteCenter() // Center of the parent View
                .offset("2px", "-5px")
        )
        .backgroundBlur(1), // Adds blur effect
    HStack(
        Text("HStack")
            .foregroundStyle(LinearGradient(
                [Color.red, Color.green, Color.hex("#dedcd5")], 
                "bottom")
            ),
        RoundedRectangle("20px")
            .background(Color.aliceblue.opacity(0.3))
            .frame({width: "100px", height: "100px"})
            .backgroundBlur(2)
            .offset("5px", "0px"),
        ZStack(
            Text("ZStack")
                .foregroundStyle(Color.red),
            RoundedRectangle("20px")
                .background(Color.aliceblue.opacity(0.7))
                .frame({width: "100px", height: "100px"})
                .offset("-5px", "0px")
        )
    )
    .frame({width: "100px", height: "150px"})
)
.gap("2%")
.absoluteCenter() // Absolute center of the parent view (CSS)
.background(Color.black.opacity(0.3))
```

This code produces the following output:

<img width="260" alt="Screenshot 2024-05-16 at 5 34 18 PM" src="https://github.com/exgael/TempSW/assets/110360316/047ca1b1-02a3-4cd0-8e88-cf102456f838">

## Additional Utilities

SWReact also includes many utilities, such as animations, to enhance development experience.
