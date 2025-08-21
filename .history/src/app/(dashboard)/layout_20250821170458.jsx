import Menu from "@/components/Menu";
import styles from "./Layout.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardlayout}>
      <aside className={styles.sidebar}>
        <Menu />
      </aside>
      <main className={styles.dashboardcontent}>{children}</main>
    </div>
  );
}