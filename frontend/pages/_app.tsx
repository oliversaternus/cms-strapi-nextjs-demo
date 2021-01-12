import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import App, { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { themeDefault as theme } from '../src/theme';
import Router from 'next/router';
import { NotificationContextProvider } from '../src/contexts/NotificationContext';
import { CircularProgress } from '@material-ui/core';
import cookies from 'next-cookies';
import CookieMessage from '../src/components/CookieMessage';
import { CookieContextProvider } from '../src/contexts/CookieContext';
import Analytics, { ReactGA } from '../src/tools/Analytics';
import Chat from '../src/tools/Chat';
import '../styles.css';
import { getCookieConfig, getGlobalData, getIntegrations } from '../src/tools/Service';
import { CookieConfig, GlobalData, Integrations } from '../src/tools/Models';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';

let loadingDebounce: NodeJS.Timeout | undefined = undefined;

const defaultMeta = {
  title: '',
  description: '',
  keywords: '',
  author: ''
}

interface ExtendedAppProps extends AppProps {
  documentCookies: Record<string, string | undefined>;
  globalData: GlobalData;
  integrations: Integrations;
  cookieConfig: CookieConfig;
}

function CustomApp(props: ExtendedAppProps) {
  const { Component, pageProps, documentCookies, globalData, integrations, cookieConfig } = props;
  const { navigation, footer, logo, favicon, copyright, previewImage } = globalData;
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);

    const onRouteChangeStart = () => {
      if (loadingDebounce) {
        clearTimeout(loadingDebounce);
      }
      loadingDebounce = setTimeout(() => {
        setIsLoading(true);
      }, 250);
    };

    const onRouteChangeComplete = () => {
      if (loadingDebounce) {
        clearTimeout(loadingDebounce);
      }
      if (!window.location.host.startsWith('localhost')) {
        ReactGA.pageview(window.location.pathname);
      }
      window.scrollTo(0, 0);
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', onRouteChangeStart);
    Router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart);
      Router.events.off('routeChangeComplete', onRouteChangeComplete);
    }
  }, [setIsLoading]);

  const getPageTitle = useCallback(() => {
    if (pageProps?.page && pageProps.page.title && pageProps.page.subtitle) {
      return `${pageProps.page.title} | ${pageProps.page.subtitle}`;
    }
    if (pageProps?.page?.title) {
      return pageProps.page.title;
    }
    return defaultMeta.title
  }, [pageProps]);

  return (
    <React.Fragment>
      <Head>
        <title>{getPageTitle()}</title>
        <meta charSet="UTF-8" />
        {favicon && <link rel="icon" href={favicon?.url} />}
        <meta name="description" content={pageProps?.description || defaultMeta.description} />
        <meta name="keywords" content={pageProps?.keywords || defaultMeta.keywords} />
        <meta name="author" content={pageProps?.author || defaultMeta.author} />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="theme-color" content="#405166" />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={pageProps?.description || defaultMeta.description} />
        {previewImage && <meta property="og:image" content={previewImage?.url} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CookieContextProvider initialValue={documentCookies.acceptedCookies || ''}>
          <NotificationContextProvider>
            {integrations.Analytics?.enabled && <Analytics trackingID={integrations.Analytics.GATrackingID} />}
            {integrations.Chat?.enabled && <Chat tawkToID={integrations.Chat.TawkToID} />}
            {isLoading && <div className="loading-overlay" style={{ background: theme.palette.backgrounds.main }}><CircularProgress color='secondary' /></div>}
            {documentCookies.acceptedCookies !== 'accepted' && documentCookies.acceptedCookies !== 'declined' && cookieConfig.enabled && <CookieMessage {...cookieConfig} />}
            <Navigation
              logoSrc={logo?.url}
              links={navigation}
            />
            <Component {...pageProps} />
            <Footer
              logoSrc={logo?.url}
              columns={footer}
              copyright={copyright}
            />
            <base target='_blank'></base>
          </NotificationContextProvider>
        </CookieContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

CustomApp.getInitialProps = async (appContext: AppContext): Promise<{ documentCookies: Record<string, string | undefined>, pageProps: any, globalData: GlobalData, integrations: Integrations, cookieConfig: CookieConfig }> => {
  const documentCookies = cookies(appContext.ctx) || {};
  const appProps = await App.getInitialProps(appContext);
  const responses = await Promise.all([getGlobalData(), getIntegrations(), getCookieConfig()]);
  const globalResponse = responses[0];
  const integrationsResponse = responses[1];
  const cookieConfigResponse = responses[2];
  const globalData: GlobalData = (!globalResponse.isError && globalResponse.data) || {};
  const integrations: Integrations = (!integrationsResponse.isError && integrationsResponse.data) || {};
  const cookieConfig: CookieConfig = (!cookieConfigResponse.isError && cookieConfigResponse.data) || {};
  return { documentCookies, globalData, integrations, cookieConfig, ...appProps };
}

export default CustomApp;
