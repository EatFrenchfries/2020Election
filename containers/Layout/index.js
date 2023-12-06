import React from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

import { useSelector } from "react-redux";
import getElection from "store/election/selectors";

import styles from "./index.module.scss";

const Layout = ({ children }) => {
  const { year } = useSelector(getElection);
  return (
    <React.Fragment>
      <Head>
        <title>{year}總統選舉即時開票地圖</title>
        <meta name="description" content="2020總統選舉即時開票地圖" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content='2020總統選舉即時開票地圖"' />
        <meta property="og:title" content='2020總統選舉即時開票地圖"' />
        <meta property="og:description" content='2020總統選舉即時開票地圖"' />
        <meta property="og:image" content="/images/ogImage.png" />
      </Head>
      <header className={styles.header}>{year} 開票地圖</header>
      <main className={styles.container}>
        {children}
        <Analytics />
      </main>
    </React.Fragment>
  );
};

export default Layout;
