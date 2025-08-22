import { User, GraduationCap, Users, Briefcase } from "lucide-react";
import styles from "./AdminPage.module.css";
import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

export default function AdminPage({ searchParams }) {
  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        {/* USER CARDS */}
        <div className={styles.cards}>
          <UserCard type="Student" icon={User} />
          <UserCard type="Teacher" icon={GraduationCap} />
          <UserCard type="Parent" icon={Users} />
          <UserCard type="Staff" icon={Briefcase} />
        </div>

        <div className={styles.dashboardContainer}>
          {/* LEFT */}
          <div className={styles.leftSection}></div>

          {/* MIDDLE */}
          <div className={styles.middleSection}>
            <div className={styles.middleCharts}>
              <div className={styles.countChart}>
                <CountChartContainer />
              </div>
              <div className={styles.attendanceChart}>
                <AttendanceChartContainer />
              </div>
            </div>
            <div className={styles.bottomChart}>
              <FinanceChart />
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.rightSection}>
            <EventCalendarContainer searchParams={searchParams} />
            <Announcements />
          </div>
        </div>
      </div>
    </div>
  );
}