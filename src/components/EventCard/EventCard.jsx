import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./EventCard.css";
import formatDate from "../../utils/utils";

export default function EventCard({
  id,
  bannerPhotoUrl,
  title,
  date,
  location,
  organizerId
}) {
  const {user}=useAuth()
  const isOrganizer = Number(user.id) === Number(organizerId)
  const isPast = new Date(date) < new Date();
  const detailsPath = isOrganizer 
    ? `/my-events/${id}/dashboard` 
    : `/events/${id}/dashboard`;
  return (
    <div className="event-card-container">
      <div className="event-card-image">
        <img src={bannerPhotoUrl} alt={title} />
      </div>
      <div className="event-card-text-link-container">
        <div className="event-card-text">
          <h2>{title}</h2>
          <span>{formatDate(date)}</span>
          <span className="city">{location}</span>
        </div>

        <Link to={detailsPath} className="event-link-button">
          <img src="/assets/icons/right-arrow.png" alt="Go to event" />
        </Link>
      </div>
    </div>
  );
}
