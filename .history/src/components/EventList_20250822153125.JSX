import styles from "./EventList.module.css";

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <p className={styles.noEvents}>No events found for this date.</p>;
  }

  return (
    <div className={styles.list}>
      {events.map((event) => (
        <div key={event._id} className={styles.card}>
          <h2 className={styles.cardTitle}>{event.title}</h2>
          <p className={styles.cardDate}>
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className={styles.cardDescription}>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
