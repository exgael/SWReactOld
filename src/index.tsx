import {Landing} from "./pages/Landing";
import {CurriculumVitae} from "./pages/CurriculumVitae";
import reportWebVitals from "./reportWebVitals";
import {ContactMe} from "./pages/ContactMe";
import { Destination } from "./swift-react/SWCore/SWProvider/useNavigate";
import { IoIosHome } from "react-icons/io";
import { IoIosBook } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import {Content} from "./swift-react";
export const BarItems: Destination[] = [
    { title: "Page 1", path: '/', view: Landing, icon: <IoIosHome size={28} />  },
    { title: "CV", path: '/curriculum_vitae', view: CurriculumVitae, icon: <IoIosBook size={28} /> },
    { title: "Page 3", path: '/contact_me', view: ContactMe, icon: <IoIosMail size={28} /> },
    { title: "Page 4", path: '/contact_me', view: ContactMe, icon: <IoIosMail size={28} /> },
];

Content(BarItems);

reportWebVitals();



