import React from "react";
import "./EventCategory.css";

export default function EventCategory({ name, iconName }) {
  const iconPath = `/assets/icons/categories/${iconName}.png`;

  return (
    <div className="event-category">
      <span>
        <img
          src={iconPath}
          alt={name}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </span>
      <span>{name}</span>
    </div>
  );
}
