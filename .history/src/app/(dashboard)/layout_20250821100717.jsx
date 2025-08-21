import styles from "./Layout.module.css";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.container}>
      {/* LEFT SIDEBAR */}
      <div className={styles.left}>
        <Link href="/dashboard" className={styles.logo}>
          <Image src="/logo2.png" alt="Logo" width={90} height={90} />
        </Link>
        <Menu />
      </div>

      {/* RIGHT CONTENT */}
      <div className={styles.right}>
        {children}
      </div>
    </div>
  );
}