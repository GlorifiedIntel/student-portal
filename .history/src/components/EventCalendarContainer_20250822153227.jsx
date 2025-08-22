import { MoreVertical } from "lucide-react";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import styles from "./EventCalendarContainer.module.css";
import Event from "@/models/Event"; 
import connectMongo from "@/lib/mongodb"; 

const EventCalendarContainer = async ({ searchParams }) => {
  const { date } = searchParams;

  // Ensure MongoDB connection
  await connectMongo();

  // Fetch events from MongoDB
  let events = [];
  if (date) {
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    events = await Event.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).lean();
  } else {
    events = await Event.find().sort({ date: 1 }).lean();
  }

  return (
    <div className={styles.container}>
      <EventCalendar />
      <div className={styles.header}>
        <h1 className={styles.title}>Events</h1>
        <MoreVertical size={20} className={styles.icon} />
      </div>
      <div className={styles.eventListWrapper}>
        <EventList events={events} dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;