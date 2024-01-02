import React, { createContext, useContext, useState, ReactNode } from "react";
import { IconType } from "react-icons";

export type TabInfo = {
    key: string;
    title: string;
    icon: IconType;
};

type TabViewContextType = {
    activeTab: TabInfo;
    activeTabKey: string;
    setActiveTabKey: (tabKey: string) => void;
    tabs: TabInfo[];
    setTabs: (tabs: TabInfo[]) => void;
};

const TabViewContext = createContext<TabViewContextType | undefined>(undefined);

export const TabViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeTabKey, setActiveTabKey] = useState<string>("");
    const [tabs, setTabs] = useState<TabInfo[]>([]);

    const activeTab = tabs.find(tab => tab.key === activeTabKey)!;

    return (
        <TabViewContext.Provider value={{ activeTabKey, setActiveTabKey, tabs, setTabs, activeTab }}>
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
