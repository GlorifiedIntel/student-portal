import { User, GraduationCap, Users, Briefcase } from "lucide-react";
import styles from "./AdminPage.module.css";

const UserCard = ({ type, icon: Icon }) => (
  <div className={styles.card}>
    <Icon className={styles.icon} />
    <p>{type}</p>
  </div>
);

const AdminPage = () => {
  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        {/* USER CARDS */}
        <div className={styles.cards}>
          <UserCard type="Student" icon={User} />
          <UserCard type="Teacher" icon={GraduationCap} />
          <UserCard type="Parent" icon={Users} />
          <UserCard type="Staff" icon={Briefcase} />
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}></div>
    </div>
  );
};

export default AdminPage;
