"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import styles from "./CountChart.module.css";

const CountChart = ({ boys, girls }) => {
  const data = [
    { name: "Total", count: boys + girls, fill: "white" },
    { name: "Girls", count: girls, fill: "#FAE27C" },
    { name: "Boys", count: boys, fill: "#C3EBFA" },
  ];

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={32}
          data={data}
        >
          <RadialBar background dataKey="count" />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image
        src="/maleFemale.png"
        alt="Male Female Icon"
        width={50}
        height={50}
        className={styles.centerImage}
      />
    </div>
  );
};

export default CountChart;