import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from "../../../reportWebVitals";
import { ContentSWReact } from "../SWProvider";
import {Destination} from "../SWProvider/useNavigate";

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export function Content(destinations: Destination[]) {
    root.render(
        <React.StrictMode>
            <ContentSWReact destinations={destinations} />
        </React.StrictMode>
    );
}

reportWebVitals();



