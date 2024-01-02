import React, { createContext, useContext, useState, ReactNode } from "react";
import { IconType } from "react-icons";

export type TabInfo = {
    key: string;
    title: string;
    icon: IconType;
};

type TabViewContextType = {
    activeTab: string;
    setActiveTab: (tabKey: string) => void;
    tabs: TabInfo[];
    setTabs: (tabs: TabInfo[]) => void;
};

const TabViewContext = createContext<TabViewContextType | undefined>(undefined);

export const TabViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<string>("");
    const [tabs, setTabs] = useState<TabInfo[]>([]);

    return (
        <TabViewContext.Provider value={{ activeTab, setActiveTab, tabs, setTabs }}>
            {children}
        </TabViewContext.Provider>
    );
};

export const useTabView = () => {
    const context = useContext(TabViewContext);
    if (!context) {
        throw new Error('useTabView must be used within a TabViewProvider');
    }
    return context;
};
