import React, {ReactElement, ReactNode} from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate as useReactNavigate, useLocation,
} from 'react-router-dom';
import {View} from "../SWTypes";
import { motion, AnimatePresence } from "framer-motion"

// Define a type for the element that will be rendered by the route


// Define a type for the route configuration
export interface Destination {
    title: string;
  //  icon: ReactElement;
    path: string;
    view: () => View;
}

// Define props for NavigationContainer
interface NavigationContainerProps {
    children: ReactNode;
}

export const NavigationContainer: React.FC<NavigationContainerProps> = ({ children }) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
};

// NavigationRoutes SWTypes
interface NavigationRoutesProps {
    destinations: Destination[];
}

// .transition(.slide)
const slideTransition = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.5 }
};

// .transition(.opacity)
const fadeTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
};

//.transition(.scale)
const scaleTransition = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { duration: 0.4 }
};

type TransitionType = 'slide' | 'fade' | 'scale';

// Define the type for the component props
interface AnimatedRouteProps {
    children: ReactNode;
    transitionType: TransitionType;
}

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({ children, transitionType }) => {
    let transition;

    switch (transitionType) {
        case 'slide':
            transition = slideTransition;
            break;
        case 'fade':
            transition = fadeTransition;
            break;
        case 'scale':
            transition = scaleTransition;
            break;
        default:
            transition = fadeTransition; // Default transition
    }

    return (
        <motion.div {...transition}>
            {children}
        </motion.div>
    );
};

/**
 * Encapsulates the react-router-dom Routes component
 * @param routes
 * @constructor
 */

export const Body: React.FC<NavigationRoutesProps> = ({ destinations }) => {
    const location = useLocation();

    return (
            <Routes location={location} key={location.pathname}>
                {destinations.map((route: Destination, index: number) => (
                    <Route
                        key={route.title + index}
                        path={route.path}
                        element={
                            <AnimatedRoute transitionType="fade">
                                {route.view().toJSX()}
                            </AnimatedRoute>
                        }
                    />
                ))}
            </Routes>
    );
};

// Type for useNavigate hook's return value
interface NavigationHook {
    navigate: (path: string) => void;
    goBack: () => void;
}

export const useNavigate = (): NavigationHook => {
    const navigate = useReactNavigate();
    return {
        navigate: (path) => navigate(path),
        goBack: () => navigate(-1),
    };
};


