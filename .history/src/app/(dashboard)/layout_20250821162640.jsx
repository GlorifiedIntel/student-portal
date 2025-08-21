import Menu from "@/components/Menu";
import "./Layout.module.css"; 

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Menu />
      <main className={styles.content}>{children}</main>
    </div>
  );
}