import Menu from "@/components/Menu";
import styles from "./Layout.module.css";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardlayout}>
      <Menu />
      <main className={styles.dashboardcontent}>
      
        {children}
      </main>
    </div>
  );
}