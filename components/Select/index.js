import React, { useEffect, useRef, useState } from "react";

import Down from "public/images/chevron-down.svg";

import styles from "./index.module.scss";

function useOutsideAlerter(ref, onClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Select = ({
  value,
  placeholder = "請選擇",
  onChange,
  options,
  selectRef,
}) => {
  const [showLists, setShowLists] = useState(false);
  const [text, setText] = useState(placeholder);
  const [isShowScroll, setIsShowScroll] = useState(false);
  const wrapperRef = useRef(null);
  const scrollRef = useRef(null);
  const handleChange = (item) => {
    setShowLists(false);
    try {
      onChange(item);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = () => {
    setShowLists(false);
  };
  useOutsideAlerter(wrapperRef, handleClose);
  useEffect(() => {
    const optionObj = options.find((option) => option.value === value);
    if (optionObj?.area_name) {
      setText(optionObj.area_name);
    } else {
      setText(placeholder);
    }
  }, [value]);
  // useEffect(() => {
  //   if (scrollRef?.current?.scrollHeight && scrollRef?.current?.clientHeight) {
  //     const showScroll = scrollRef.current.scrollHeight > scrollRef.current.clientHeight
  //     setIsShowScroll(showScroll)
  //   }
  // }, [showLists])
  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      <div
        className={`${styles.block} ${showLists ? styles.focus : ""}`}
        onClick={() => setShowLists(!showLists)}
        ref={selectRef}
      >
        <span>{text}</span>
        <Down />
      </div>
      {showLists && (
        <div
          className={`${styles.lists} ${
            showLists ? styles["show-lists"] : ""
          } ${isShowScroll ? styles["show-scroll"] : ""}`}
        >
          <ul
            className={`${styles.listBox} ${
              showLists ? styles["show-lists"] : ""
            }`}
            ref={scrollRef}
          >
            {options.map((item) => (
              <li
                key={item.value}
                className={`${styles.list} ${
                  value === item.value ? styles.active : ""
                }`}
                onClick={() => handleChange(item)}
              >
                {item.area_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
