import { MoreVertical } from "lucide-react";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import styles from "./EventCalendarContainer.module.css";
import connectMongoDB from "@/lib/mongodb";
import Event from "@/models/Event";

const EventCalendarContainer = async ({ searchParams }) => {
  const { date } = searchParams;

  await connectMongoDB();

  let events = [];
  try {
    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      events = await Event.find({
        date: { $gte: selectedDate, $lt: nextDay },
      }).lean();
    } else {
      events = await Event.find().sort({ date: 1 }).lean();
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <div className={styles.container}>
      {/* Calendar */}
      <EventCalendar />

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Events</h1>
        <MoreVertical size={20} className={styles.icon} />
      </div>

      {/* Event List */}
      <div className={styles.eventListWrapper}>
        <EventList events={events} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;