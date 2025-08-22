import styles from "./EventList.module.css";

const EventList = ({ events }) => {
  return events.map((event, index) => (
    <div
      key={event._id.toString()}
      className={`${styles.eventCard} ${
        index % 2 === 0 ? styles.borderSky : styles.borderPurple
      }`}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>{event.title}</h1>
        <span className={styles.time}>
          {new Date(event.startTime).toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className={styles.description}>{event.description}</p>
    </div>
  ));
};

export default EventList;