import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from "../../../reportWebVitals";
import { SWReact } from "../SWProvider";
import View from '../SWTypes/View';

import '../SWProvider/language/i18n';

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

/**
 * Entry point for the Views to be rendered
 * @param content - View to be rendered
 */
export function Content( content: View ): void {

    const isStrictMode: boolean = false

    if (isStrictMode){
        root.render(
            <React.StrictMode>
                <SWReact content={content} />
            </React.StrictMode>
        );
    } else {
        root.render(
            <SWReact content={content} />
        );
    }
}

reportWebVitals();



