import React from "react";
import { Link } from "react-router-dom";
import "./EventCard.css";
import formatDate from "../../utils/utils";

export default function EventCard({ id, imageUrl, title, date, location }) {
  return (
    <div className="event-card-container">
      <div className="event-card-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="event-card-text-link-container">
        <div className="event-card-text">
          <h2>{title}</h2>
          <span>{formatDate(date)}</span>
          <span className="city">{location}</span>
        </div>

        <Link to={`/events/${id}`} className="event-link-button">
          <img src="/assets/icons/right-arrow.png" alt="Go to event" />
        </Link>
      </div>
    </div>
  );
}
