import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEventById,
  getUserProfileSummary,
  getEventParticipants,
  getUserProfile,
  registerForEvent,
  unregisterFromEvent,
} from "../../server/api";
import { useAuth } from "../../context/AuthContext";
import { useCategories } from "../../context/CategoryContext";
import EventCategory from "../../components/EventCategory/EventCategory";
import styles from "./EventRegister.module.css";

export default function EventRegister() {
  const { user } = useAuth();
  const userId = user.id;
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();

  const [event, setEvent] = useState(null);
  const [userData, setUserData] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [organizerProfile, setOrganizerProfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => sessionStorage.getItem("access_token");

  const getCategoryById = (categoryId) => {
    return categories.find((cat) => cat.id === categoryId);
  };

 useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      const token = getToken();
      setLoading(true);
      try {
        const [eventData, userdata, participantsData] = await Promise.all([
          getEventById(eventId, token),
          getUserProfile(userId, token),
          getEventParticipants(eventId, token),
        ]);

        if (isMounted) {
          setEvent(eventData);
          setParticipants(participantsData);
          setUserData(userdata);

          const isUserInList = participantsData.some(
            (p) => String(p.userId) === String(userId)
          );
          setIsRegistered(isUserInList);

          if (eventData.organizerId) {
            const profile = await getUserProfileSummary(eventData.organizerId, token);
            setOrganizerProfile(profile);
          }
        }
      } catch (err) {
        if (isMounted) setError("Не вдалося завантажити дані.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; }; 
  }, [eventId, userId]);

  const canRegister = (user, event) => {
    if (!user || !event) {
      return false;
    }

    const minAge = event.minAge || 0;
    const maxAge = event.maxAge || 999;
    const isAgeOk = user.age >= minAge && user.age <= maxAge;

    const isGenderOk =
      !event.requiredGender ||
      event.requiredGender === "ANY" ||
      event.requiredGender === "Всі" ||
      user.gender === event.requiredGender;

    return isAgeOk && isGenderOk;
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  if (loading) {
    return <div className={styles.loading}>Завантаження...</div>;
  }
  const isFull =
    event.maxParticipants && participants.length >= event.maxParticipants;
  const isEligible = canRegister(userData, event);

  const handleToggleRegistration = async () => {
    const token = getToken();
    setIsSubmitting(true);
    try {
      if (isRegistered) {
        setCancelModal(true);
      } else {
        await registerForEvent(eventId, token);
        setIsRegistered(true);
        setShowModal(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {event.photoUrl || event.bannerPhotoUrl ? (
              <img
                src={event.photoUrl || event.bannerPhotoUrl}
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
                const day = date.getDate();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                return `${day}.${month}.${year}`;
              })()}
            </div>

            <div className={styles.eventMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Стать:</span>
                <span className={styles.metaValue}>
                  {event.requiredGender === "ANY" ||
                  event.requiredGender === "Всі"
                    ? "Всі"
                    : event.requiredGender || "Всі"}
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
                  {event.maxParticipants || "∞"}
                </span>
              </div>
            </div>
            {isFull ? (
              <p className={styles.forbidden}>
                На жаль,всі місця на івент зайняті.
                <br>Спробуйте заглянути пізніше </br>{" "}
              </p>
            ) : isEligible ? (
              <button
                className={`${styles.buttonLink} ${isRegistered ? styles.unregisterBtn : styles.buttonLink} ${isSubmitting ? styles.submittingBtn : ""}`}
                onClick={handleToggleRegistration}
              >
                {isSubmitting
                  ? "Зачекайте..."
                  : isRegistered
                    ? "Скасувати реєстрацію"
                    : "Зареєструватися"}
              </button>
            ) : (
              <p className={styles.forbidden}>
                На жаль, ви не відповідаєте обмеженням івенту.
              </p>
            )}

            {showModal && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalWindow}>
                  <img src="/assets/icons/checked.png" />
                  <h3>Заявку надіслано</h3>
                  <p>
                    Ви отримаєте сповіщення на пошту, щойно вашу участь буде
                    схвалено організатором.
                  </p>
                  <button
                    className={styles.modalBtn}
                    onClick={() => setShowModal(false)}
                  >
                    На головну
                  </button>
                </div>
              </div>
            )}
            {cancelModal && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalWindow}>
                  <img src="/assets/icons/warning.png" />
                  <h3>Скасувати реєстрацію?</h3>
                  <p>Ви втратите можливість потрапити на подію.</p>
                  <button
                    className={styles.modalBtn}
                    onClick={() => setCancelModal(false)}
                  >
                    Назад
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={async () => {
                      const token = getToken();
                      await unregisterFromEvent(eventId, token);
                      setCancelModal(false);
                      setIsRegistered(false);
                    }}
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            )}

            <div
              className={styles.organizer}
              style={{ cursor: "pointer" }}
              onClick={() =>
                organizerProfile &&
                handleUserClick(organizerProfile.id || event.organizerId)
              }
            >
              <div className={styles.organizerAvatar}>
                {organizerProfile?.avatarUrl ? (
                  <img
                    src={organizerProfile.avatarUrl}
                    alt={organizerProfile.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/icons/user.png";
                      e.target.className = styles.defaultUserIcon;
                    }}
                  />
                ) : (
                  <img
                    src="/assets/icons/user.png"
                    alt="Default avatar"
                    className={styles.defaultUserIcon}
                  />
                )}
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
              <span className={styles.metaLabel}>Про івент: </span>
              {event.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
