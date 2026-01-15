import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";
import EventCarousel from "../../components/EventCarousel/EventCarousel";
import EventCategory from "../../components/EventCategory/EventCategory";
import { getHomeData } from "../../server/api";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [homeData, setHomeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getHomeData();
        console.log(result);
        setHomeData(result);
      } catch (err) {
        console.log("can't fetch");
        setError(err.message);
      }
    }
    loadData();
  }, []);

  if (!homeData) return <div>Завантаження...</div>;

  const eventCategories = homeData.categories.map((category) => (
    <EventCategory
      key={category.id}
      name={category.name}
      iconName={category.iconName}
    />
  ));

  return (
    <main className="home-page-wrapper">
      <section>
        <div className="create-account-container">
          <div className="create-account-text">
            <h1>
              Ваші інтереси <br />
              Ваша компанія
            </h1>
            <p>
              Eventure - це платформа для пошуку однодумців. Ми допомагаємо вам
              перетворити ваші інтереси на реальні події. Організовуйте власні
              зустрічі або знаходьте ідеальний івент поруч із вами — від гри в
              баскетбол до спільного походу в кіно.
            </p>
            <Link
              to={isAuthenticated ? "/create-event" : "/login"}
              className="button-link"
            >
              {isAuthenticated ? "Створити івент" : "Створити акаунт"}
            </Link>
          </div>
          <div className="home-page-img">
            <img src="https://placehold.co/585x540" />
          </div>
        </div>
      </section>

      <section>
        <div className="popular-events-container">
          <h1>Популярні івенти</h1>
          <EventCarousel events={homeData.trendingEvents} />
        </div>
      </section>

      <section>
        <div className="event-categories-section">
          <h1>Категорії</h1>
          <div className="event-categories-container">{eventCategories}</div>
        </div>
      </section>
    </main>
  );
}
