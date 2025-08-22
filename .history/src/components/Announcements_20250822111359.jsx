import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/mongodb";
import Announcement, { Class } from "@/models/Announcement";
import styles from "./Announcements.module.css";
import mongoose from "mongoose";

const Announcements = async () => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata)?.role;

  await dbConnect();

  let query = {};

  if (role !== "admin") {
    if (role === "teacher") {
      // Announcements where the class teacherId matches userId
      const teacherClasses = await Class.find({ teacherId: userId }).select("_id");
      query = {
        $or: [
          { classId: null },
          { classId: { $in: teacherClasses.map(c => c._id) } }
        ]
      };
    } else if (role === "student") {
      // Announcements where the student is in class.students
      const studentClasses = await Class.find({ students: userId }).select("_id");
      query = {
        $or: [
          { classId: null },
          { classId: { $in: studentClasses.map(c => c._id) } }
        ]
      };
    } else if (role === "parent") {
      // Announcements where the parent is linked to the class
      const parentClasses = await Class.find({ parentId: userId }).select("_id");
      query = {
        $or: [
          { classId: null },
          { classId: { $in: parentClasses.map(c => c._id) } }
        ]
      };
    }
  }

  const data = await Announcement.find(query)
    .sort({ date: -1 })
    .limit(3)
    .lean();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Announcements</h1>
        <span className={styles.viewAll}>View All</span>
      </div>

      <div className={styles.announcements}>
        {data.map((item, idx) => (
          <div
            key={item._id}
            className={`${styles.card} ${
              idx === 0
                ? styles.sky
                : idx === 1
                ? styles.purple
                : styles.yellow
            }`}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <span className={styles.cardDate}>
                {new Intl.DateTimeFormat("en-GB").format(new Date(item.date))}
              </span>
            </div>
            <p className={styles.cardDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;