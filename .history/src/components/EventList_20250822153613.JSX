"use client";

import styles from "./EventList.module.css";

const EventList = ({ events = [], dateParam }) => {
  // If a date is provided, filter events for that date
  const filteredEvents = dateParam
    ? events.filter((event) => {
        const eventDate = new Date(event.date).toDateString();
        const paramDate = new Date(dateParam).toDateString();
        return eventDate === paramDate;
      })
    : events;

  if (!filteredEvents.length) {
    return <p className={styles.noEvents}>No events found for this date.</p>;
  }

  return (
    <ul className={styles.list}>
      {filteredEvents.map((event) => (
        <li key={event._id} className={styles.item}>
          <h3 className={styles.name}>{event.name}</h3>
          <p className={styles.date}>
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className={styles.location}>{event.location}</p>
        </li>
      ))}
    </ul>
  );
};

export default EventList;