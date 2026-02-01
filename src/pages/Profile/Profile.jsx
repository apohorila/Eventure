import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import EventCarousel from "../../components/EventCarousel/EventCarousel";
import styles from "./Profile.module.css";
import { useCategories } from "../../context/CategoryContext";
import { useAuth } from "../../context/AuthContext";
import {
  FaTelegram,
  FaInstagram,
  FaGithub,
  FaFacebook,
  FaLink,
} from "react-icons/fa";
import EventCategory from "../../components/EventCategory/EventCategory";
import { getUserProfile, getEventsByOrganizer } from "../../server/api";


export default function Profile() {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { logout, user: currentUser } = useAuth();
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOwner = !userId || String(currentUser?.id) === String(userId);
  const targetId = userId || currentUser?.id;

  const getCategory = (id) => {
    return categories.find((category) => category.id === id);
  };

  useEffect(() => {
    const fetchData = async () => {
      if(!targetId) return
      setLoading(true);
      const token = sessionStorage.getItem("access_token");

      try {
        const data = await getUserProfile(targetId, token);
        setProfile(data);

        if (!isOwner) {
          const eventData = await getEventsByOrganizer(targetId, token);
          setUserEvents(Array.isArray(eventData) ? eventData : []);
        } else{
            setUserEvents([])
        }
      } catch (err) {
        setUserEvents([]);
      } finally {
        setLoading(false);
      }
    };
    if (targetId) fetchData();
  }, [userId, currentUser?.id]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p>Завантажуємо ваш профіль...</p>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className={styles.error}>
        Профіль не знайдено або сталася помилка.
      </div>
    );
  }

  const getSocilaIcon = (url) => {
    if (url.includes("t.me") || url.includes("telegram")) return <FaTelegram />;
    if (url.includes("instagram.com")) return <FaInstagram />;
    if (url.includes("github.com")) return <FaGithub />;
    if (url.includes("facebook.com")) return <FaFacebook />;
    return <FaLink />;
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/profiles/${user.id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        logout();
        navigate("/");
      }
    } catch (err) {
      console.error("Сталася помилка", err);
    } finally {
      setIsModalOpen(false);
    }
  };

  console.log(userEvents)

  return (
    <main className={styles.mainPage}>
      <section>
        <div className={styles.profileInfo}>
          <div className={styles.picContainer}></div>
          <div className={`${styles.infoContainer} ${styles.container}`}>
            <div className={styles.nameRate}>
            <h2 className={styles.title}>
              {profile.firstName} {profile.lastName}
            </h2>
            <div className={styles.rate}>
                <span>{profile.rating}</span>
                <img src="/assets/icons/star.png"/>
            </div>
            </div>
            <div className={`${styles.mailAbout} ${styles.container}`}>
              <span>{profile.email}</span>
              <span className={styles.title}>
                Про себе: <span className={styles.value}>{profile.bio}</span>
              </span>
            </div>
            <div className={`${styles.cityGenderAge} ${styles.container}`}>
              <div className={`${styles.cityGender} ${styles.container}`}>
                <span className={styles.title}>
                  Місто:{" "}
                  <span className={styles.value}>{profile.location}</span>
                </span>
                <span className={styles.title}>
                  Стать: <span className={styles.value}>{profile.gender}</span>
                </span>
              </div>
              <span className={styles.title}>
                Вік: <span className={styles.value}>{profile.age} років</span>
              </span>
            </div>
            <div className={styles.socialsContainer}>
              <span className={styles.title}>Соцмережі</span>
              <div className={styles.socials}>
                {profile?.socialMediaLinks?.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialMediaIcon}
                  >
                    {getSocilaIcon(url)}
                  </a>
                ))}
              </div>
            </div>
            <div className={styles.interestsContainer}>
              <span className={styles.title}>Інтереси</span>
              <div className={styles.interests}>
                {profile?.interestsIds?.map((categoryId) => {
                  const categoryData = getCategory(categoryId);
                  return categoryData ? (
                    <EventCategory
                      key={categoryId}
                      name={categoryData.name}
                      iconName={categoryData.iconName}
                    />
                  ) : null;
                })}
              </div>
            </div>
            {isOwner && (
              <div className={styles.buttonsContainer}>
                <Link
                  to="edit"
                  className={styles.buttonLink}
                  state={{ initialData: profile }}
                >
                  Редагувати профіль
                </Link>
                <button
                  className={`${styles.buttonLink} ${styles.deleteBtn}`}
                  onClick={() => setIsModalOpen(true)}
                >
                  Видалити профіль
                </button>
              </div>
            )}
          </div>
          {isModalOpen && isOwner && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h3>Ви впевнені, що хочете видалити свій акаунт?</h3>
                <p>
                  Цю дію неможливо скасувати. Всі ваші дані, історія відвідувань
                  та заплановані івенти будуть видалені назавжди.
                </p>
                <div className={styles.modalButtons}>
                  <button
                    className={styles.confirmBtn}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Скасувати
                  </button>
                  <button className={styles.cancelBtn} onClick={handleDelete}>
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {!isOwner && <section className={styles.eventsSection}>
        <h2 className={styles.title}>Заплановані івенти</h2>
        <div className={styles.events}>{
            userEvents.length > 0 ?
            <EventCarousel events={userEvents} />
            : <p>У користувача немає поточних івентів.</p>
            }</div>
      </section>}
    </main>
  );
}
