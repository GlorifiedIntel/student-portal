import Menu from "@/components/Menu";
import "./Layout.module.css"; 
import Image from "next/image";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Link>
      <Image src={"/logo2.png"} alt="Logo" width={50} height={50} />
        <span className="logo-text">Dashboard</span>

      </Link>
      <Menu />
      <main className="dashboard-content">{children}</main>
    </div>
  );
}