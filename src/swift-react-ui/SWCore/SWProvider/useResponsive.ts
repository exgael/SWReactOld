import { useState, useEffect } from 'react';

interface ResponsiveState {
    width: number;
    height: number;
    isPhone: boolean;
    isTablet: boolean;
    isDesktop: boolean
    orientation: 'portrait' | 'landscape';
}

export const useResponsive = (): ResponsiveState => {
    const [size, setSize] = useState<ResponsiveState>({
        width: window.innerWidth,
        height: window.innerHeight,
        isPhone: window.innerWidth < 576,
        isTablet: window.innerWidth >= 576 && window.innerWidth < 992,
        isDesktop:  window.innerWidth >= 992,
        orientation: (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait'
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
                isPhone: window.innerWidth < 576,
                isTablet: window.innerWidth >= 576 && window.innerWidth < 992,
                isDesktop:  window.innerWidth >= 992,
                orientation: (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait'
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
};
