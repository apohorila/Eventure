import React from "react"
import {Link} from "react-router-dom"
import "./EventCard.css"
import formatDate from "../../../utils"

export default function EventCard(event){

    return (
        <div className="event-card-container">
            <div className="event-card-image">
                 <img src={`${event.imageUrl}`}/>
            </div>
            <div className="event-card-text-link-container">
                <div className="event-card-text">
                    <h2>{event.title}</h2>
                    <span>{formatDate(event.date)}</span>
                    <span className="city">{event.location}</span>
                </div>
                    <Link to="/events/:id" className="event-link-button"><img src="src/assets/icons/right-arrow.png"/></Link>
            </div>
        </div>
    )
}