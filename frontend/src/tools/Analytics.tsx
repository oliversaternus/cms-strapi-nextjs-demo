import React, { useState, useContext, useEffect } from 'react';
import { CookieContext } from '../contexts/CookieContext';
import ReactGA from 'react-ga';

const Analytics: React.FC<{ trackingID?: string }> = ({ trackingID }) => {
    const [initialized, setInitialized] = useState(false);
    const { accepted, sessionId } = useContext(CookieContext);

    useEffect(() => {
        if (accepted === 'all' && !initialized && trackingID) {
            ReactGA.initialize(trackingID);
            if (!window.location.host.startsWith('localhost')) {
                ReactGA.pageview(window.location.pathname);
            }
            setInitialized(true);
            return;
        }
        if (accepted === 'essential' && !initialized && trackingID && sessionId) {

            ReactGA.ga('create', trackingID, 'auto',
                {
                    'storage': 'none',
                    'storeGac': false,
                    'clientId': sessionId
                }
            );
        }
    }, [accepted, sessionId]);

    return null;
}

export { ReactGA };

export default Analytics;