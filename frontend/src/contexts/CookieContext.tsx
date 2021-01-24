import React, { useEffect, useState } from 'react';
import { randomHex } from '../tools/Utils';

export type AcceptCookieType = {
    all: boolean;
    none: boolean;
    [key: string]: boolean;
};

export const CookieContext = React.createContext<{
    accepted: AcceptCookieType;
    acceptCookies: (value: AcceptCookieType) => void;
    sessionId?: string;
}>(
    {
        accepted: {
            all: false,
            none: true
        },
        acceptCookies: () => undefined,
        sessionId: undefined
    });

export const CookieContextProvider: React.FC<{ initialValue?: AcceptCookieType, session?: string }> = ({ children, initialValue, session }) => {
    const [accepted, setAccepted] = useState(initialValue || { all: false, none: true });
    const [sessionId, setSessionId] = useState(session);

    const acceptCookies = (value: AcceptCookieType) => {
        if (!document) {
            return;
        }
        document.cookie = `acceptedCookies=${JSON.stringify(value)}; path=/; max-age=31536000`;
        setAccepted(value);
    };

    useEffect(
        () => {
            if (!accepted?.none && !sessionId) {
                const id = randomHex(32);
                document.cookie = `sessionId=${id}; path=/; max-age=31536000`;
                setSessionId(sessionId);
            }
        }, [accepted, session]
    );

    return (
        <CookieContext.Provider value={{ accepted, acceptCookies, sessionId }}>
            {children}
        </CookieContext.Provider>
    );
}