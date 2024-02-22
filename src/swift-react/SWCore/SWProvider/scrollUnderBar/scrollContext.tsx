import React, { createContext, useState, useContext } from 'react';

// Define the context shape
interface ScrollContextProps {
    isContentUnderNav: boolean;
    isContentUnderTab: boolean;
    setScrollPosition: (position: number) => void;
    position: number;
}

// Create the context
export const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

// Custom hook for convenient access to context
export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScrollContext must be used within a ScrollProvider');
    }
    return context;
};

interface ScrollProviderProps {
    children: React.ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
    const [isContentUnderNav, setIsContentUnderNav] = useState(false);
    const [isContentUnderTab, setIsContentUnderTab] = useState(false);
    const [position, setPosition] = useState(0);

    const setScrollPosition = (position: number) => {
        const navBarHeight = document.getElementsByClassName('navigation-bar')[0]?.clientHeight || 0;
        const tabBarHeight = document.getElementsByClassName('tab-bar')[0]?.clientHeight || 0;
        const scrollableContentElement = document.getElementsByClassName('scrollableContent')[0];

        if (scrollableContentElement) {
            setPosition(position);

            const scrollableContentRect = scrollableContentElement.getBoundingClientRect();
            const scrollableContainerHeight = scrollableContentElement.clientHeight;

            setIsContentUnderNav(position > navBarHeight);


            // TODO: Fix this - The logic is backwards but it works for now

            // Calculate the top position of the tab bar
            const topOfTabBar = window.innerHeight - navBarHeight - tabBarHeight;

            // Calculate the bottom position of the scrollable content relative to the viewport
            const bottomOfContent = position + scrollableContentRect.bottom - scrollableContentRect.top;

            // Calculate overlap
            const bottomOfContentHasPassedTabBar = bottomOfContent >= topOfTabBar;
            const notScrolledToBottom = (position + scrollableContainerHeight) < scrollableContentElement.scrollHeight;
            const isUnderTab = bottomOfContentHasPassedTabBar && notScrolledToBottom;
            setIsContentUnderTab(isUnderTab);
        }
    };

    return (
        <ScrollContext.Provider value={{ isContentUnderNav, isContentUnderTab, setScrollPosition, position }}>
            {children}
        </ScrollContext.Provider>
    )
};
