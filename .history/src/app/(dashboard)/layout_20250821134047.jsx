import Menu from "@/components/Menu";
import styles from "./Layout.module.css"; 
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardLayout}>
      <Link href="/admin" className={styles.logo}>
        <Image src={"/logo2.png"} alt="Logo" width={50} height={50} />
        <span className={styles.logoText}>Dashboard</span>
      </Link>
      <Menu />
      <div className={styles.dashboardContent}>
        {children}
      </div>
    </div>
  );
}