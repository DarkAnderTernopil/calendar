import React from 'react';
import App from 'next/app';
import withReduxStore from '../lib/withReduxStore';

import { Provider } from 'react-redux';

import { compose } from 'redux';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <div className="main-block">
          <Component className={`main-block`} {...pageProps} />
        </div>
      </Provider>
    );
  }
}

export default compose(withReduxStore)(MyApp);
