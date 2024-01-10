import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { View } from "../SWTypes";
import {ThemeProvider, useTheme} from "./useTheme";

interface ContentProps {
    content: View
}

export const SWReact: React.FC<ContentProps> = ({ content }) => {

    return (

            <Router>
                <ThemeProvider>
                    {content.toJSX()}
                </ThemeProvider>
            </Router>

    );
};