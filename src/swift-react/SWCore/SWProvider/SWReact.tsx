import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {View} from "../SWTypes";

interface ContentProps {
    content: View
}

export const SWReact: React.FC<ContentProps> = ({content}) => {
    return (
        <Router>
                {content.toJSX()}
        </Router>
    );
};