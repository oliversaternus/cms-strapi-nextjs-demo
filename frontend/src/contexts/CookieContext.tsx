import React, { useState } from 'react';

export const CookieContext = React.createContext<{
    accepted: boolean;
    acceptCookies: () => void;
    declineCookies: () => void;
}>(
    {
        accepted: false,
        acceptCookies: () => undefined,
        declineCookies: () => undefined
    });

export const CookieContextProvider: React.FC<{ initialValue: string }> = ({ children, initialValue }) => {
    const [accepted, setAccepted] = useState(initialValue === 'accepted');

    const acceptCookies = () => {
        if (!document) {
            return;
        }
        document.cookie = 'acceptedCookies=accepted; path=/; max-age=31536000';
        setAccepted(true);
    };

    const declineCookies = () => {
        if (!document) {
            return;
        }
        document.cookie = 'acceptedCookies=declined; path=/; max-age=604800';
        setAccepted(false);
    };

    return (
        <CookieContext.Provider value={{ accepted, acceptCookies, declineCookies }}>
            {children}
        </CookieContext.Provider>
    );
}