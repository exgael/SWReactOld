import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StackContextType {
    stacks: Record<string, string[]>;
    push: (stackName: string, path: string) => void;
    pop: (stackName: string) => void;
    replace: (stackName: string, path: string) => void;
    switchStack: (stackName: string, path: string) => void;
}

export const StackContext = createContext<StackContextType | undefined>(undefined);

interface StackProviderProps {
    children: ReactNode;
}

export const StackProvider = ({ children }: StackProviderProps) => {
    const [stacks, setStacks] = useState<Record<string, string[]>>({});

    const push = (stackName: string, path: string) => {
        setStacks(prev => ({
            ...prev,
            [stackName]: [...(prev[stackName] || []), path]
        }));
    };

    const pop = (stackName: string) => {
        setStacks(prev => ({
            ...prev,
            [stackName]: prev[stackName].slice(0, -1)
        }));
    };

    const replace = (stackName: string, path: string) => {
        setStacks(prev => ({
            ...prev,
            [stackName]: [...prev[stackName].slice(0, -1), path]
        }));
    };

    const switchStack = (stackName: string, path: string) => {
        setStacks(prev => ({
            ...prev,
            [stackName]: [path]
        }));
    };

    const value = { stacks, push, pop, replace, switchStack };

    return <StackContext.Provider value={value}>{children}</StackContext.Provider>;
};

