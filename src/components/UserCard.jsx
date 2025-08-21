import { MoreVertical } from "lucide-react";
import styles from "./UserCard.module.css";

const UserCard = ({ type }) => {
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.badge}>2024/25</span>
        <MoreVertical size={20} className={styles.moreIcon} />
      </div>

      <h1 className={styles.value}>1,234</h1>
      <h2 className={styles.type}>{type}</h2>
    </div>
  );
};

export default UserCard;
