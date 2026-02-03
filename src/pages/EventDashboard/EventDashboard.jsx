import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EventDashboard.module.css";
import EventCategory from "../../components/EventCategory/EventCategory";
import { useCategories } from "../../context/CategoryContext";

import {
  getEventById,
  getEventParticipants,
  changeParticipantStatus,
  getUserProfileSummary,
} from "../../server/api";

const EventDashboard = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();

  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [organizerProfile, setOrganizerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => sessionStorage.getItem("access_token");

  const getCategoryById = (categoryId) => {
    return categories.find((cat) => cat.id === categoryId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();

      try {
        const [eventData, participantsData] = await Promise.all([
          getEventById(eventId, token),
          getEventParticipants(eventId, token),
        ]);

        setEvent(eventData);
        setParticipants(participantsData);

        if (eventData.organizerId) {
          try {
            const profile = await getUserProfileSummary(
              eventData.organizerId,
              token,
            );
            setOrganizerProfile(profile);
          } catch (err) {
            console.warn("Failed to load organizer profile:", err);
          }
        }
      } catch (err) {
        console.error(err);
        if (err.message === "ACCESS_DENIED") {
          setError("Ви не є організатором цього івенту. Доступ заборонено.");
        } else {
          setError("Не вдалося завантажити дані.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const handleStatusChange = async (participantId, newStatus) => {
    const token = getToken();
    const previousParticipants = [...participants];

    if (newStatus === "DENIED") {
      setParticipants((prev) => prev.filter((p) => p.id !== participantId));
    } else {
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === participantId ? { ...p, status: newStatus } : p,
        ),
      );
    }

    try {
      await changeParticipantStatus(eventId, participantId, newStatus, token);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Помилка при оновленні статусу");
      setParticipants(previousParticipants);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const pendingRequests = participants.filter((p) => p.status === "PENDING");

  const approvedParticipants = participants.filter(
    (p) => p.status === "APPROVED",
  );

  if (loading) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <h2>{error}</h2>
          <button
            onClick={() => navigate("/profile")}
            className={styles.btnBack}
          >
            Повернутися в профіль
          </button>
        </div>
      </div>
    );
  }

  const eventCategory = event?.categoryId
    ? getCategoryById(event.categoryId)
    : null;

  return (
    <div className={styles.container}>
      {event && (
        <div className={styles.eventInfo}>
          <div className={styles.eventImageWrapper}>
            {event.bannerPhotoUrl ? (
              <img
                src={event.bannerPhotoUrl}
                alt={event.title}
                className={styles.eventImage}
              />
            ) : (
              <div className={styles.noImage}></div>
            )}
          </div>

          <div className={styles.eventDetails}>
            {eventCategory && (
              <div className={styles.categoryWrapper}>
                <EventCategory
                  name={eventCategory.name}
                  iconName={eventCategory.iconName}
                />
              </div>
            )}

            <h1 className={styles.eventTitle}>{event.title}</h1>
            <div className={styles.eventDate}>
              {(() => {
                const date = new Date(event.eventDate);
                return `${date.getDate()}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
              })()}
            </div>

            <div className={styles.eventMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Стать:</span>
                <span className={styles.metaValue}>
                  {event.requiredGender || "Всі"}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Місто:</span>
                <span className={styles.metaValue}>{event.location}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Вік:</span>
                <span className={styles.metaValue}>
                  {event.minAge ? `${event.minAge}+` : "18+"}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Учасники:</span>
                <span className={styles.metaValue}>
                  {approvedParticipants.length} / {event.maxParticipants || "∞"}
                </span>
              </div>
            </div>

            <div
              className={styles.organizer}
              onClick={() => handleUserClick(event.organizerId)}
            >
              <div className={styles.organizerAvatar}>
                <img
                  src={organizerProfile?.avatarUrl || "/assets/icons/user.png"}
                  alt="Organizer"
                  onError={(e) => (e.target.src = "/assets/icons/user.png")}
                />
              </div>
              <div className={styles.organizerInfo}>
                <div className={styles.organizerName}>
                  {organizerProfile?.name || "Організатор"}
                </div>
                <div className={styles.organizerUsername}>
                  @{organizerProfile?.email || "organizer"}
                </div>
              </div>
            </div>

            <div className={styles.eventDescription}>
              <strong>Про івент:</strong> {event.description}
            </div>
          </div>
        </div>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Запити</h2>
        {pendingRequests.length === 0 ? (
          <div className={styles.emptyState}>Немає нових запитів</div>
        ) : (
          <div className={styles.requestsList}>
            {pendingRequests.map((user) => (
              <div key={user.id} className={styles.requestCard}>
                <div
                  className={styles.userInfo}
                  onClick={() => handleUserClick(user.id)}
                >
                  <div className={styles.avatar}>
                    <img
                      src={user.picture || "/assets/icons/user.png"}
                      alt={user.name}
                      onError={(e) => (e.target.src = "/assets/icons/user.png")}
                    />
                  </div>
                  <div className={styles.userDetails}>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userNick}>
                      @{user.email || "user"}
                    </div>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    onClick={() => handleStatusChange(user.id, "APPROVED")}
                    className={styles.btnAction}
                  >
                    <img src="/assets/icons/accept.png" alt="Accept" />
                  </button>
                  <button
                    onClick={() => handleStatusChange(user.id, "DENIED")}
                    className={styles.btnAction}
                  >
                    <img src="/assets/icons/reject.png" alt="Reject" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Учасники</h2>
        {approvedParticipants.length === 0 ? (
          <div className={styles.emptyState}>Ще немає учасників</div>
        ) : (
          <div className={styles.participantsGrid}>
            {approvedParticipants.map((user) => (
              <div
                key={user.id}
                className={styles.participantCard}
                onClick={() => handleUserClick(user.id)}
              >
                <div className={styles.avatar}>
                  <img
                    src={user.picture || "/assets/icons/user.png"}
                    alt={user.name}
                    onError={(e) => (e.target.src = "/assets/icons/user.png")}
                  />
                </div>
                <div className={styles.participantText}>
                  <div className={styles.userName}>{user.name}</div>
                  <div className={styles.userNick}>@{user.email || "user"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventDashboard;
