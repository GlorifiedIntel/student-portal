import Menu from "@/components/Menu";
import "./Layout.module.css"; 

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Menu />
      <main className={StyleSheet.dashboard-content}>{children}</main>
    </div>
  );
}