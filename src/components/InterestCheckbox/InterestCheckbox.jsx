import React from "react"
import EventCategory from "../EventCategory/EventCategory"
import styles from "../../pages/CreateProfile/CreateProfile.module.css"

export default function InterestCheckbox({category, isSelected, onToggle}){
    return (
        <>
        <label className={`${styles.interestItem} ${isSelected ? styles.checked : ""}`}>
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