import React, {useEffect, useState} from 'react';

export const InstallNotification = () => {
    const [showInstallMessage, setShowInstallMessage] = useState(false);

    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    };

    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    useEffect(() => {
        if (isIos() && !isInStandaloneMode()) {
            setShowInstallMessage(true);
        }
    }, []);

    return (
        <div>
            {showInstallMessage && (
                <div>
                    {/* Your popup or message for installing the app */}
                    <p>Install this application on your iOS device: tap the share button and then 'Add to Home
                        Screen'.</p>
                </div>
            )}
        </div>
    );
};
