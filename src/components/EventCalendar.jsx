"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EventCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([]);
  const router = useRouter();

  // Fetch events from MongoDB API route
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    fetchEvents();
  }, []);

  // Push selected date to URL
  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toISOString().split("T")[0]}`);
    }
  }, [value, router]);

  // Highlight days with events
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasEvent = events.some(
        (event) =>
          new Date(event.date).toDateString() === date.toDateString()
      );
      return hasEvent ? "event-day" : null;
    }
  };

  return (
    <Calendar
      onChange={onChange}
      value={value}
      tileClassName={tileClassName}
    />
  );
};

export default EventCalendar;