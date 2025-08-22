import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import Announcement, { Class } from "@/models/Announcement";
import User from "@/models/User";
import styles from "./Announcements.module.css";

const Announcements = async () => {
  // ✅ Get the session from NextAuth
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className={styles.noAccess}>You must be logged in to see announcements.</p>;
  }

  // ✅ Extract role & userId from session.user
  const userId = session.user?.id;
  const role = session.user?.role;

  await dbConnect();

  let query = {};

  if (role !== "admin") {
    if (role === "teacher") {
      // Get classes where the teacher is assigned
      const teacher = await User.findOne({ _id: userId, role: "teacher" });
      const teacherClasses = await Class.find({ teacherId: teacher?._id }).select("_id");
      query = {
        $or: [
          { classId: null },
          { classId: { $in: teacherClasses.map((c) => c._id) } },
        ],
      };
    } else if (role === "student") {
      // Get classes where student is enrolled
      const student = await User.findOne({ _id: userId, role: "student" });
      const studentClasses = await Class.find({ students: student?._id }).select("_id");
      query = {
        $or: [
          { classId: null },
          { classId: { $in: studentClasses.map((c) => c._id) } },
        ],
      };
    } else if (role === "parent") {
      // Get classes where parent is linked
      const parent = await User.findOne({ _id: userId, role: "parent" });
      const parentClasses = await Class.find({ parentId: parent?._id }).select("_id");
      query = {
        $or: [
          { classId: null },
          { classId: { $in: parentClasses.map((c) => c._id) } },
        ],
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
              idx === 0 ? styles.sky : idx === 1 ? styles.purple : styles.yellow
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