import Sidebar from "@/components/Menubar";
import "./Layout.module.css"; 

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Menubar />
      <main className="dashboard-content">{children}</main>
    </div>
  );
}