import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StackContext } from './NavigationStackProvider'; // Adjust the import path as needed

interface StackManager {
    stacks: Record<string, string[]>;
    navigate: (stackName: string, path: string, action?: 'push' | 'pop' | 'replace') => void;
    switchStack: (stackName: string, path: string) => void;
}

export const useStackManager = (): StackManager => {
    const context = useContext(StackContext);
    if (!context) {
        throw new Error('useStackManager must be used within a NavigationStackProvider');
    }
    const { stacks, push, pop, replace, switchStack } = context;
    const navigate = useNavigate();

    const navigateTo = (stackName: string, path: string, action: 'push' | 'pop' | 'replace' = 'push') => {
        switch (action) {
            case 'push':
                push(stackName, path);
                navigate(path);
                break;
            case 'pop':
                pop(stackName);
                if (stacks[stackName].length > 0) {
                    navigate(stacks[stackName][stacks[stackName].length - 1]);
                }
                break;
            case 'replace':
                replace(stackName, path);
                navigate(path, { replace: true });
                break;
            default:
                console.error('Invalid navigation action');
        }
    };
    return { stacks, navigate: navigateTo, switchStack };
};
