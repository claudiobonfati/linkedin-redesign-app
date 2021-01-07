import React from 'react';
import NextApp from 'next/app';
import '../styles/styles.sass';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from '../graphql/apollo';
import Layout from '../components/Layout';

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <ApolloProvider client={ApolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Layout>
    );
  }
}

export default App;
