import React, {ReactNode} from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate as useReactNavigate,
} from 'react-router-dom';
import {View} from "../SWTypes";

// Define a type for the element that will be rendered by the route


// Define a type for the route configuration
export interface Destination {
    title: string;
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

/**
 * Encapsulates the react-router-dom Routes component
 * @param routes
 * @constructor
 */
export const Body: React.FC<NavigationRoutesProps> = ({ destinations }) => {
    return (
        <Routes>
            {destinations.map((route: Destination, index: number) => (
                <Route key={route.title + index} path={route.path} element={route.view().render()} />
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


