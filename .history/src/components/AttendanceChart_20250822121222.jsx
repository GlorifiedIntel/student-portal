"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CheckCircle, XCircle } from "lucide-react";
import styles from "./AttendanceChart.module.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltipBox}>
        <p className={styles.tooltipLabel}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className={styles.tooltipItem}>
            {entry.dataKey === "present" ? (
              <CheckCircle size={14} className={styles.presentIcon} />
            ) : (
              <XCircle size={14} className={styles.absentIcon} />
            )}
            &nbsp;{entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}:{" "}
            {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AttendanceChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart width={500} height={300} data={data} barSize={20}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{ fill: "#d1d5db" }}
          tickLine={false}
        />
        <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          align="left"
          verticalAlign="top"
          wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          formatter={(value) => (
            <span className={styles.legendItem}>
              {value === "present" ? (
                <CheckCircle size={14} className={styles.presentIcon} />
              ) : (
                <XCircle size={14} className={styles.absentIcon} />
              )}
              &nbsp;{value.charAt(0).toUpperCase() + value.slice(1)}
            </span>
          )}
        />
        <Bar
          dataKey="present"
          fill="#FAE27C"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="absent"
          fill="#C3EBFA"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;