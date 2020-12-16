import React from 'react';
import NextApp from 'next/app';
import '../styles/styles.sass';

class App extends NextApp {
  componentDidMount() {
    // =)
  }

  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default App;
