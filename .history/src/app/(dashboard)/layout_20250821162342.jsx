import Menu from "@/components/Menu";
import "./Layout.module.css"; 

export default function DashboardLayout({ children }) {
  return (
    <div className={stylesheet.dashboard-layout}>
      <Menu />
      <main className={styles.dashboard-content}>{children}</main>
    </div>
  );
}