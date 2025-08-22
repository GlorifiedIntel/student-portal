import { MoreVertical } from "lucide-react";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import styles from "./EventCalendarContainer.module.css";

import { dbConnect } from "@/lib/Mongodb";
import Event from "@/models/Event";

const EventCalendarContainer = async ({ searchParams }) => {
  await dbConnect();

  const { date } = searchParams;
  const targetDate = date ? new Date(date) : new Date();

  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  const events = await Event.find({
    startTime: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  }).lean();

  return (
    <div className={styles.container}>
      <EventCalendar events={events} /> {/* pass events if needed */}
      <div className={styles.header}>
        <h1 className={styles.title}>Events</h1>
        <MoreVertical size={20} className={styles.icon} />
      </div>
      <div className={styles.eventListWrapper}>
        <EventList events={events} /> {/* pass events to EventList */}
      </div>
    </div>
  );
};

export default EventCalendarContainer;