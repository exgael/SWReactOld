import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {View} from "../SWTypes";
import {ScrollProvider} from "./scrollUnderBar/scrollContext";

interface ContentProps {
    content: View
}

export const SWReact: React.FC<ContentProps> = ({content}) => {
    return (
        <Router>
            <ScrollProvider>
                {content.toJSX()}
            </ScrollProvider>
        </Router>
    );
};