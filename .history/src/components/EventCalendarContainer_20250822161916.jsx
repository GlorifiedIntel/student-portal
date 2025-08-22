import { MoreVertical } from "lucide-react";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import styles from "./EventCalendarContainer.module.css";
import { dbConnect } from "@/lib/mongodb"; 
import Event from "@/models/Event";

const EventCalendarContainer = async ({ searchParams }) => {
  const { date } = searchParams;

  // ✅ Ensure MongoDB is connected
  await dbConnect();

  // ✅ Fetch events (sorted by date, so the list is ordered)
  const events = await Event.find().sort({ date: 1 }).lean();

  // Convert MongoDB objects to JSON-safe format
  const safeEvents = JSON.parse(JSON.stringify(events));

  return (
    <div className={styles.container}>
      {/* ✅ Pass events to EventCalendar if it needs them */}
      <EventCalendar events={safeEvents} selectedDate={date} />

      <div className={styles.header}>
        <h1 className={styles.title}>Events</h1>
        <MoreVertical size={20} className={styles.icon} />
      </div>

      <div className={styles.eventListWrapper}>
        {/* ✅ Pass fetched events + dateParam down to EventList */}
        <EventList dateParam={date} events={safeEvents} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;