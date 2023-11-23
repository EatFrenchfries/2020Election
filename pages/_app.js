import React, { useEffect } from "react";
import Router from "next/router";
import { END } from "redux-saga";
import { wrapper } from "store";
import "styles/globals.scss";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    // ssr refresh
    Router.beforePopState(({ url, as }) => {
      window.location.href = as;
      return false;
    });
  }, []);

  return <Component {...pageProps} />;
};

App.getInitialProps = async ({ Component, ctx }) => {
  // 1. Wait for all page actions to dispatch
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };
  // 2. Stop the saga if on server
  if (ctx.req) {
    ctx.store.dispatch(END);
    await ctx.store.sagaTask.toPromise();
  }
  // 3. Return props
  return {
    pageProps,
  };
};

export default wrapper.withRedux(App);
