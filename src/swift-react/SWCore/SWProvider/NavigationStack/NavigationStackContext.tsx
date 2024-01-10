import React, {createContext, useContext, useState} from 'react';
import {useTabView} from "../../SWTemplates/SWTabView/SWTabViewProvider";
import {View} from "../../SWTypes";

// Define the structure of each item in the navigation stack
interface NavigationStackItem {
    component: View;
    key: string;
    title?: string;
}

// Define the structure of each navigation stack
interface NavigationStack {
    items: NavigationStackItem[];
}

// Define the structure for all navigation stacks keyed by tab
interface NavigationStacks {
    [tabKey: string]: NavigationStack;
}

// Context Props
interface NavigationStackContextProps {
    stacks: NavigationStacks;
    push: (component: View, title?: string, tabKey?: string) => void;
    pop: (tabKey?: string) => void;
    reset: (tabKey?: string) => void; // Resets the stack to its initial state
    currentStackItem: NavigationStackItem;
    currentStack: NavigationStack;
    canPop: boolean; // length > 1
    previousStackItem: NavigationStackItem;
}

// Create the context
const NavigationStackContext = createContext<NavigationStackContextProps | undefined>(undefined);

// Type for the provider component
interface NavigationStackProviderProps {
    children: React.ReactNode;
}

// Create the provider component
export const NavigationStackProvider: React.FC<NavigationStackProviderProps> = ({children}) => {
    const [stacks, setStacks] = useState<NavigationStacks>({});
    const {activeTabKey} = useTabView()

    const push = (component: View, title?: string, tabKey: string = activeTabKey) => {
        if (!tabKey) return; // Ensure activeTabKey is set
        const stack = stacks[tabKey] || {items: []};
        stack.items.push({component, key: Math.random().toString(36).substring(7), title});
        setStacks({...stacks, [tabKey]: stack});
    };

    const pop = (tabKey: string = activeTabKey) => {
        if (!tabKey) return; // Ensure activeTabKey is set
        const stack = stacks[tabKey];
        if (stack && stack.items.length > 0) {
            stack.items.pop();
            setStacks({...stacks, [tabKey]: stack});
        }
    };

    const reset = (tabKey: string = activeTabKey) => {
        if (!tabKey) return; // Ensure activeTabKey is set
        const stack = stacks[tabKey];
        if (stack) {
            stack.items = stack.items.slice(0, 1); // Keep only the first item in the stack
            setStacks({...stacks, [tabKey]: stack});
        }
    };

    const currentStack = stacks[activeTabKey];
    const currentStackItem = currentStack?.items[currentStack.items.length - 1];
    const canPop = currentStack?.items.length > 1;
    const previousStackItem = currentStack?.items[currentStack.items.length - 2];

    return (
        <NavigationStackContext.Provider
            value={{stacks, push, pop, reset, currentStackItem, currentStack, canPop, previousStackItem}}>
            {children}
        </NavigationStackContext.Provider>
    );
};

// Hook to use the navigation stack context
export const useNavigationStack = () => {
    const context = useContext(NavigationStackContext);
    if (!context) {
        throw new Error('useNavigationStack must be used within a NavigationStackProvider');
    }
    return context;
};
