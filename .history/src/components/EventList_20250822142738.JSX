import clientPromise from "@/lib/mongodb";
import styles from "./EventList.module.css";

const EventList = async ({ dateParam }) => {
  const client = await clientPromise;
  const db = client.db("myDatabase"); // change to your DB name
  const collection = db.collection("events");

  const date = dateParam ? new Date(dateParam) : new Date();

  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const data = await collection
    .find({
      startTime: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
    .toArray();

  return data.map((event, index) => (
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