import React, { createContext, useContext, useState, ReactNode } from 'react';
import {View} from "../../SWTypes";


interface FullscreenCoverContextValue {
    isPresented: boolean;
    content: View | null;
    showCover: (view: View) => void;
    hideCover: () => void;
}

const FullscreenCoverContext = createContext<FullscreenCoverContextValue>({
    isPresented: false,
    content: null,
    showCover: () => {},
    hideCover: () => {}
});

export const useFullscreenCover = () => useContext(FullscreenCoverContext);

interface FullscreenCoverProviderProps {
    children: ReactNode;
}

export const FullscreenCoverProvider: React.FC<FullscreenCoverProviderProps> = ({ children }) => {
    const [isPresented, setIsPresented] = useState<boolean>(false);
    const [content, setContent] = useState<View | null>(null);

    const showCover = (view: View) => {
        setContent(view);
        setIsPresented(true);
    };

    const hideCover = () => {
        setIsPresented(false);
        setContent(null);
    };

    return (
        <FullscreenCoverContext.Provider value={{ isPresented, content, showCover, hideCover }}>
            {children}
        </FullscreenCoverContext.Provider>
    );
};
