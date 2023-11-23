import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import styles from "./index.module.scss";

const CustomPieChart = ({ data, colors, type, showMin }) => {
  const [percent, setPercent] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [delayShow, setDelayShow] = useState(false);
  const handleHover = ({ percent, name }) => {
    setPercent(`${(percent * 100).toFixed(1)}%`);
    setIsShow(true);
  };
  useEffect(() => {
    if (isShow) setDelayShow(true);
    const timer = setTimeout(() => setDelayShow(isShow), 300);
    return () => clearTimeout(timer);
  }, [isShow]);
  return (
    <>
      <PieChart width={showMin ? 72 : 120} height={showMin ? 72 : 120}>
        {/* <Tooltip
                contentStyle={{
                  background: "white",
                  border: "none",
                  height: "40px",
                  fontSize: "16px",
                }}
                position={{ x: 85, y: -60 }}
              /> */}
        <Pie
          data={data}
          innerRadius={showMin ? 20 : 33}
          outerRadius={showMin ? 36 : 60}
          fill="#8884d8"
          dataKey="value"
          stroke="none"
          startAngle={90}
          endAngle={-270}
          onMouseEnter={handleHover}
          onMouseLeave={() => setIsShow(false)}
          animationDuration={500}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                type === "party"
                  ? colors[entry.cand_no - 1]
                  : colors[index % colors.length]
              }
              style={{ outline: "none" }}
            />
          ))}
        </Pie>
      </PieChart>
      {delayShow && <span className={styles.percent}>{percent}</span>}
    </>
  );
};

export default CustomPieChart;
