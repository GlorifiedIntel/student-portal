import Link from "next/link";
import Image from "next/image";
import "./Layout.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      {/* LEFT SIDEBAR */}
      <div className="left">
        <Link href="/admin" className="logo">
          <Image src="/logo2.png" alt="Logo" width={50} height={50} />
          <span className="logo-text">Dashboard</span>
        </Link>
      </div>

      {/* RIGHT CONTENT */}
      <div className="right">
        {children}
      </div>
    </div>
  );
}
