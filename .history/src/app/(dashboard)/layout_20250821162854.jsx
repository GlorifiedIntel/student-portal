import Menu from "@/components/Menu";
import "./Layout.module.css"; 

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardlayout}>
      <Menu />
      <main className={styles.dashboardcontent}>{children}</main>
    </div>
  );
}