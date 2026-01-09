import React from "react"
import {Link} from "react-router-dom"
import "./EventCard.css"

export default function EventCard({event}){
    return (
        <div className="event-card-container">
            <div className="event-card-image">
                 <img src="https://placehold.co/359x300"/>
            </div>
            <div className="event-card-text-link-container">
                <div className="event-card-text">
                    <h2>Назва події</h2>
                    <span>10 серпня</span>
                    <span className="city">Київ</span>
                </div>
                    <Link to="/events/:id" className="event-link-button"><img src="src/assets/icons/right-arrow.png"/></Link>
            </div>
        </div>
    )
}