import React from "react";

import Down from "public/images/chevron-down.svg";

import styles from "./index.module.scss";

const DisabledBox = ({ placeholder = "請選擇", styleStatus = "disabled" }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <span>{placeholder}</span>
        {styleStatus === "disabled" && <Down />}
      </div>
    </div>
  );
};

export default DisabledBox;
