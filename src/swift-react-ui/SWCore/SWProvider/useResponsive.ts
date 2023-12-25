import { useState, useEffect } from 'react';

interface ResponsiveState {
    width: number;
    height: number;
    orientation: 'portrait' | 'landscape';
}

export const useResponsive = (): ResponsiveState => {
    const [size, setSize] = useState<ResponsiveState>({
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait'
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
                orientation: (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait'
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
};
