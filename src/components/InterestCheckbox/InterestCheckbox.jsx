import React from "react"
import EventCategory from "../EventCategory/EventCategory"

export default function InterestCheckbox({category, isSelected, onToggle}){
    return (
        <>
        <label className={`interest-item ${isSelected ? "checked": ""}`}>
            <input 
            type="checkbox"
            checked={isSelected}
            onChange={()=> onToggle(category.id)}
            style={{display:"none"}}
            />
            <EventCategory name={category.name} iconName={category.iconName} isActive={isSelected} />
        </label>
        </>
    )

}