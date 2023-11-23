import React from "react";
import Head from "next/head";

import styles from "./index.module.scss";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <title>2020總統選舉即時開票地圖</title>
        <meta name="description" content="2020總統選舉即時開票地圖" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>2020 開票地圖</header>
      <main className={styles.container}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
