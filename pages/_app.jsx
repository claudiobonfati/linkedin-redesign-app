import React from 'react';
import NextApp from 'next/app';
import '../styles/styles.sass';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from '../graphql/apollo';

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={ApolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default App;
