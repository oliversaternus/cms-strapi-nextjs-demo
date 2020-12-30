import React, { useState, useContext, useEffect } from 'react';
import { CookieContext } from '../contexts/CookieContext';
import ReactGA from 'react-ga';

const Analytics: React.FC<{ trackingID?: string }> = ({ trackingID }) => {
    const [initialized, setInitialized] = useState(false);
    const { accepted } = useContext(CookieContext);

    useEffect(() => {
        if (accepted && !initialized && trackingID) {
            ReactGA.initialize(trackingID);
            if (!window.location.host.startsWith('localhost')) {
                ReactGA.pageview(window.location.pathname);
            }
            setInitialized(true);
        }
    }, [accepted]);

    return null;
}

export { ReactGA };

export default Analytics;