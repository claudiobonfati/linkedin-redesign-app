import React, { Fragment } from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
import ApolloClient from '../graphql/apollo';
import Layout from '../components/Layout';
import { useTransitionFix } from '../utils/useTransitionFix';
import '../styles/styles.sass';

function LayoutWrapper({ children }) {
  const transitionCallback = useTransitionFix();

  return (
    <Layout>
      <ApolloProvider client={ApolloClient}>
        <AnimatePresence exitBeforeEnter onExitComplete={transitionCallback}>
          {children}
        </AnimatePresence>
      </ApolloProvider>
    </Layout>
  );
}

class App extends NextApp {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <title>LinkedIn Redesign</title>
          <meta name="description" content="What if LinkedIn was beautiful? - LinkedIn Redesign is a new interface concept for LinkedIn web. Coded by Claudio Bonfati / Designed by Gregoire Vella" />
          <link rel="apple-touch-icon" sizes="57x57" href={`${process.env.BASE_PATH}/images/favicon/apple-icon-57x57.png`} />
          <link rel="apple-touch-icon" sizes="60x60" href={`${process.env.BASE_PATH}/images/favicon/apple-icon-60x60.png`} />
          <link rel="apple-touch-icon" sizes="72x72" href={`${process.env.BASE_PATH}/images/favicon/apple-icon-72x72.png`} />
          <link rel="apple-touch-icon" sizes="76x76" href={`${process.env.BASE_PATH}/images/favicon/apple-icon-76x76.png`} />
          <link rel="apple-touch-icon" sizes="114x114" href={`${process.env.BASE_PATH}/images/favicon/apple-icon-114x114.png`} />
          <link rel="apple-touch-icon" sizes="120x120" href={`${process.env.BASE_PATH}/images/favicon/apple-icon-120x120.png`} />
          <link rel="apple-touch-icon" sizes="144x144" href={`${process.env.BASE_PATH}/images/favicon/apple-icon-144x144.png`} />
          <link rel="apple-touch-icon" sizes="152x152" href={`${process.env.BASE_PATH}/images/favicon/apple-icon-152x152.png`} />
          <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.BASE_PATH}/images/favicon/apple-icon-180x180.png`} />
          <link rel="icon" type="image/png" sizes="192x192" href={`${process.env.BASE_PATH}/images/favicon/android-icon-192x192.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.BASE_PATH}/images/favicon/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="96x96" href={`${process.env.BASE_PATH}/images/favicon/favicon-96x96.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.BASE_PATH}/images/favicon/favicon-16x16.png`} />
          <meta name="msapplication-TileColor" content="#007FB2" />
          <meta name="msapplication-TileImage" content={`${process.env.BASE_PATH}/images/favicon/ms-icon-144x144.png`} />
          <meta name="theme-color" content="#007FB2" />
          <meta property="og:url" content="https://claudiobonfati.github.io/linkedin-redesign-app" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="LinkedIn Redesign. What if LinkedIn was beautiful?" />
          <meta property="og:description" content="LinkedIn Redesign is a new interface concept for LinkedIn web. Coded by Claudio Bonfati / Designed by Gregoire Vella" />
          <meta property="og:image" content="https://claudiobonfati.github.io/linkedin-redesign-app/images/og-image.png" />
        </Head>
        <LayoutWrapper>
          <Component {...pageProps} key={router.asPath} />
        </LayoutWrapper>
      </>
    );
  }
}

export default App;
