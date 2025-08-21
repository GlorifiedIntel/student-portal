import { Search, MessageSquare, Megaphone, User } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      {/* SEARCH BAR */}
      <div className={styles.searchBar}>
        <Search size={14} className={styles.iconInline} />
        <input 
          type="text" 
          placeholder="Search..." 
          className={styles.searchInput} 
        />
      </div>

      {/* ICONS AND USER */}
      <div className={styles.iconUserWrapper}>
        <div className={styles.icon}>
          <MessageSquare size={20} />
        </div>

        <div className={`${styles.icon} ${styles.relativeIcon}`}>
          <Megaphone size={20} />
          <div className={styles.badge}>1</div>
        </div>

        <div className={styles.userInfo}>
          <span className={styles.userName}>John Doe</span>
          <span className={styles.userRole}>Admin</span>
        </div>

        <div className={styles.avatar}>
          <User size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
