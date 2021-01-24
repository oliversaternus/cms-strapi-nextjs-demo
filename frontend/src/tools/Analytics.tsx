import React, { useState, useContext, useEffect } from 'react';
import { CookieContext } from '../contexts/CookieContext';
import ReactGA from 'react-ga';

const Analytics: React.FC<{ trackingID?: string, cookieValue?: string, anonymousTracking?: boolean }> = ({ trackingID, cookieValue = 'all', anonymousTracking }) => {
    const [initialized, setInitialized] = useState(false);
    const { accepted, sessionId } = useContext(CookieContext);

    useEffect(() => {
        if ((accepted[cookieValue] || accepted.all) && !initialized && trackingID) {
            ReactGA.initialize(trackingID);
            if (!window.location.host.startsWith('localhost')) {
                ReactGA.pageview(window.location.pathname);
            }
            setInitialized(true);
            return;
        } else if ((accepted.essential || accepted.all) && !initialized && trackingID && anonymousTracking && sessionId) {

            ReactGA.ga('create', trackingID, 'auto',
                {
                    'storage': 'none',
                    'storeGac': false,
                    'clientId': sessionId
                }
            );
            if (!window.location.host.startsWith('localhost')) {
                ReactGA.pageview(window.location.pathname);
            }
            setInitialized(true);
        }
    }, [accepted, sessionId]);

    return null;
}

export { ReactGA };

export default Analytics;