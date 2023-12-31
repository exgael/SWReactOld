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
    const getResponsiveState = (): ResponsiveState => ({
        width: window.innerWidth,
        height: window.innerHeight,
        isPhone: window.matchMedia("(max-width: 575.98px)").matches,
        isTablet: window.matchMedia("(min-width: 576px) and (max-width: 991.98px)").matches,
        isDesktop: window.matchMedia("(min-width: 992px)").matches,
        orientation: (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait'
    });

    const [size, setSize] = useState<ResponsiveState>(getResponsiveState());

    useEffect(() => {
        const handleResize = () => {
            setSize(getResponsiveState());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
};
