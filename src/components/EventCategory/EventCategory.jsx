import React from "react";
import "./EventCategory.css"

export default function EventCategory(category){
    return (
        <div className="event-category">
            <span><img src={`src/assets/icons/categories/${category.iconName}.png`}/></span>
            <span>{category.name}</span>
        </div>
    )
}