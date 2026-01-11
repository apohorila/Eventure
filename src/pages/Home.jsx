import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import EventCarousel from "../components/EventCarousel/EventCarousel";
import EventCategory from "../components/EventCategory/EventCategory";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <main className="home-page-wrapper">
        <section>
          <div className="create-account-container">
            <div className="create-account-text">
              <h1>
                Ваші інтереси <br />
                Ваша компанія
              </h1>
              <p>
                Eventure - це платформа для пошуку однодумців. Ми допомагаємо
                вам перетворити ваші інтереси на реальні події. Організовуйте
                власні зустрічі або знаходьте ідеальний івент поруч із вами —
                від гри в баскетбол до спільного походу в кіно.
              </p>
              <Link
                to={isAuthenticated ? "/create" : "/login"}
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
            <EventCarousel />
          </div>
        </section>
        <section>
          <div className="event-categories-section">
            <h1>Категорії</h1>
            <div className="event-categories-container">
              <EventCategory name="Спорт та активний відпочинок" />
              <EventCategory name="Ігри та хобі" />
              <EventCategory name="Соціальні та міські заходи" />
              <EventCategory name="Подорожі та поїздки" />
              <EventCategory name="Волонтерство" />
              <EventCategory name="Освіта та розвиток" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
