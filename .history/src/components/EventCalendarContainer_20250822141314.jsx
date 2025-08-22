import { MoreVertical } from "lucide-react";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import styles from "./EventCalendarContainer.module.css";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = searchParams;

  return (
    <div className={styles.container}>
      <EventCalendar />
      <div className={styles.header}>
        <h1 className={styles.title}>Events</h1>
        <MoreVertical size={20} className={styles.icon} />
      </div>
      <div className={styles.eventListWrapper}>
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;