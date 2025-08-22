import Image from "next/image";
import CountChart from "./CountChart";
import { dbConnect } from "@/lib/mongodb";
import Student from "@/models/Student";
import styles from "./CountChartContainer.module.css";

const CountChartContainer = async () => {
  await dbConnect();

  // MongoDB aggregation instead of Prisma groupBy
  const data = await Student.aggregate([
    { $group: { _id: "$sex", count: { $sum: 1 } } },
  ]);

  const boys = data.find((d) => d._id === "MALE")?.count || 0;
  const girls = data.find((d) => d._id === "FEMALE")?.count || 0;

  return (
    <div className={styles.container}>
      {/* TITLE */}
      <div className={styles.header}>
        <h1 className={styles.title}>Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* CHART */}
      <CountChart boys={boys} girls={girls} />

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <div className={styles.statBox}>
          <div className={`${styles.dot} ${styles.sky}`} />
          <h1 className={styles.count}>{boys}</h1>
          <h2 className={styles.subtitle}>
            Boys ({Math.round((boys / (boys + girls || 1)) * 100)}%)
          </h2>
        </div>
        <div className={styles.statBox}>
          <div className={`${styles.dot} ${styles.yellow}`} />
          <h1 className={styles.count}>{girls}</h1>
          <h2 className={styles.subtitle}>
            Girls ({Math.round((girls / (boys + girls || 1)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;