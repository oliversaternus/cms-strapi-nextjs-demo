import React, { useEffect, useState } from 'react';
import { randomHex } from '../tools/Utils';

export type AcceptCookieType = 'none' | 'essential' | 'all';

export const CookieContext = React.createContext<{
    accepted: AcceptCookieType;
    acceptCookies: (value: AcceptCookieType) => void;
    sessionId?: string;
}>(
    {
        accepted: 'none',
        acceptCookies: () => undefined,
        sessionId: undefined
    });

export const CookieContextProvider: React.FC<{ initialValue?: string, session?: string }> = ({ children, initialValue, session }) => {
    const [accepted, setAccepted] = useState((['none', 'essential', 'all'].includes(initialValue || '') ? initialValue : 'none') as AcceptCookieType);
    const [sessionId, setSessionId] = useState(session);

    const acceptCookies = (value: AcceptCookieType) => {
        if (!document) {
            return;
        }
        document.cookie = `acceptedCookies=${value}; path=/; max-age=31536000`;
        setAccepted(value);
    };

    useEffect(
        () => {
            if (!sessionId) {
                const id = randomHex(32);
                document.cookie = `sessionId=${id}; path=/; max-age=31536000`;
                setSessionId(sessionId);
            }
        }, [session]
    );

    return (
        <CookieContext.Provider value={{ accepted, acceptCookies, sessionId }}>
            {children}
        </CookieContext.Provider>
    );
}