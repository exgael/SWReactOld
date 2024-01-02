import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {View} from "../SWTypes";
import {NavigationStackProvider} from "./NavigationStack/NavigationStackProvider";

interface ContentProps {
    content: View
}

export const SWReact: React.FC<ContentProps> = ({ content }) => {

    return (
        <Router>
            <NavigationStackProvider>
                {content.toJSX()}
            </NavigationStackProvider>
        </Router>
    );
};