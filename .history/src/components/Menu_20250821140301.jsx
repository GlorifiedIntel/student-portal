"use client";

import Link from "next/link";
import {
  Home,
  Users,
  GraduationCap,
  UserSquare2,
  BookOpen,
  NotebookText,
  FileCheck,
  ClipboardList,
  CalendarCheck,
  Calendar,
  MessageSquare,
  Megaphone,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import styles from "./Menu.module.css";  // ✅ Corrected import

const menuItems = [
  {
    title: "DASHBOARD",
    items: [
      { icon: Home, label: "Home", href: "/" },
      { icon: Users, label: "Teachers", href: "/teachers" },
      { icon: GraduationCap, label: "Students", href: "/students" },
      { icon: UserSquare2, label: "Parents", href: "/parents" },
      { icon: BookOpen, label: "Classes", href: "/classes" },
      { icon: NotebookText, label: "Lessons", href: "/lessons" },
      { icon: FileCheck, label: "Exams", href: "/exams" },
      { icon: ClipboardList, label: "Assignments", href: "/assignments" },
      { icon: CalendarCheck, label: "Attendance", href: "/attendance" },
      { icon: Calendar, label: "Events", href: "/events" },
      { icon: MessageSquare, label: "Messages", href: "/messages" },
      { icon: Megaphone, label: "Announcements", href: "/announcements" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { icon: User, label: "Profile", href: "/profile" },
      { icon: Settings, label: "Settings", href: "/settings" },
      { icon: LogOut, label: "Logout", href: "/logout" },
    ],
  },
];

const Menu = () => {
  return (
    <div className={styles.menu}>
      {menuItems.map((section) => (
        <div className={styles["menu-section"]} key={section.title}>
          <span className={styles["menu-title"]}>{section.title}</span>
          {section.items.map((item) => (
            <Link href={item.href} key={item.label} className={styles["menu-link"]}>
              <item.icon size={26} className={styles["menu-icon"]} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;