import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard.jsx";
import styles from "./MyEvents.module.css";
import { useAuth } from "../../context/AuthContext";
import {
  getCreatedEvents,
  getRegisteredEvents,
  getMyTotalEvents,
} from "../../server/api.js";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get("type");

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("access_token");
        let data = [];

        if (currentType === "created") {
          data = await getCreatedEvents(user.id, token);
        } else if (currentType === "attended") {
          data = await getRegisteredEvents("APPROVED", token);
        } else {
          data = await getMyTotalEvents(token, "APPROVED");
        }

        setEvents(data);
      } catch (err) {
        setError("Не вдалося завантажити події");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, currentType]);

  if (loading) return <div className={styles.pageWrapper}>Завантаження...</div>;
  if (error) return <div className={styles.pageWrapper}>{error}</div>;

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Мої івенти</h1>

      <div className={styles.filters}>
        <button
          className={styles.filterBtn}
          onClick={() => setSearchParams({})}
        >
          Всі
        </button>
        <button
          className={styles.filterBtn}
          onClick={() => setSearchParams({ type: "created" })}
        >
          Створені
        </button>
        <button
          className={styles.filterBtn}
          onClick={() => setSearchParams({ type: "attended" })}
        >
          Підтверджені
        </button>
      </div>

      {events.length > 0 ? (
        <div className={styles.eventsContainer}>
          {events.map((event) => (
            <div key={event.id}>
              <EventCard
                id={event.id}
                bannerPhotoUrl={event.bannerPhotoUrl}
                title={event.title}
                date={event.eventDate}
                location={event.location}
                organizerId={event.organizerId}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>Тут поки що нічого немає.</div>
      )}
    </div>
  );
}
