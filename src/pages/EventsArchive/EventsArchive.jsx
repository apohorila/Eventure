import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getEventsArchive } from "../../server/api";
import EventCard from "../../components/EventCard/EventCard";
import styles from "./EventsArchive.module.css";

export default function EventsArchive() {
  const { user } = useAuth();

  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [archiveEvents, setArchiveEvents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get("type");

  useEffect(() => {
    const fetchMyArchive = async () => {
      if (!user?.id) return;

      setLoading(true);
      const token = sessionStorage.getItem("access_token");
      try {
        const data = await getEventsArchive(user.id, token, currentType);
        setArchiveEvents(data);
      } catch (err) {
        console.error("Архів не завантажено:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArchive();
  }, [user?.id, currentType]);

  if (loading)
    return <div className={styles.spinner}>Завантаження історії подій...</div>;
  console.log(user.id);

  return (
    <main>
      <div className={styles.archive}>
        <h1>Архів івентів</h1>
        <div className={styles.filters}>
            <button
          className={styles.filterBtn}
          onClick={() => setSearchParams()}
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
          Відвідані
        </button>
        
        </div>
        <div className={styles.eventsContainer}>
          {archiveEvents.map((event) => {
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                bannerPhotoUrl={event.bannerPhotoUrl}
                location={event.location}
                date={event.eventDate}
                organizerId={event.organizerId}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
