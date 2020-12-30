import React, { useState, useContext, useEffect } from 'react';
import { CookieContext } from '../contexts/CookieContext';
import tawkTo from 'tawkto-react';

const Chat: React.FC<{ tawkToID?: string }> = ({ tawkToID }) => {
    const [initialized, setInitialized] = useState(false);
    const { accepted } = useContext(CookieContext);

    useEffect(() => {
        if (accepted && !initialized && tawkToID) {
            tawkTo(tawkToID);
            setInitialized(true);
        }
    }, [accepted]);

    return null;
}

export default Chat;