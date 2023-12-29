import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Landing from "./pages/Landing";
import {CurriculumVitae} from "./pages/CurriculumVitae";
import reportWebVitals from "./reportWebVitals";
import {Content} from "./swift-react-ui/SWCore";
import {ContactMe} from "./pages/ContactMe";
import {Destination} from "./swift-react-ui/SWCore/SWProvider/Navigation";
import { FullscreenCoverProvider } from './swift-react-ui/SWCore/SWProvider/Modals/FullscreenCoverContext';
const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export const BarItems: Destination[] = [
    { title: "Home", path: '/', view: Landing },
    { title: "CV", path: '/curriculum_vitae', view: CurriculumVitae },
    { title: "Contact Me", path: '/contact_me', view: ContactMe },
];

root.render(
    <React.StrictMode>
        <FullscreenCoverProvider>
            <Content destinations={BarItems} />
        </FullscreenCoverProvider>
    </React.StrictMode>
);

reportWebVitals();



