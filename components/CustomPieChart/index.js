import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Sector } from "recharts";

import styles from "./index.module.scss";

const DIFF_RADIUS = 3;

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fill={fill}
        className={styles.percent}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + DIFF_RADIUS}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const CustomPieChart = ({ data, colors, type, showMin }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleHover = ({ percent, name }, index) => {
    setActiveIndex(index);
  };
  const handleLeave = () => {
    setActiveIndex(null);
  };
  return (
    <>
      <PieChart
        width={showMin ? 72 : 120}
        height={showMin ? 72 : 120}
        cursor="pointer"
      >
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
          outerRadius={showMin ? 36 - DIFF_RADIUS : 60 - DIFF_RADIUS}
          fill="#8884d8"
          dataKey="value"
          stroke="none"
          startAngle={90}
          endAngle={-270}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          animationBegin={10}
          animationDuration={500}
          animationEasing="ease-in-out"
          activeShape={renderActiveShape}
          activeIndex={activeIndex}
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
    </>
  );
};

export default CustomPieChart;
