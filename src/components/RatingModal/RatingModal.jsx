import React, { useState } from "react";
import StarRating from "../../components/StarRating/StarRating";
import styles from "./RatingModal.module.css";
import { FaBullseye } from "react-icons/fa6";

export default function FeedbackForm({ eventId, userId, eventTitle, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    setIsSubmitting(true);

    const feedbackPayload = {
      eventId: eventId,
      userId: userId,
      score: rating,
      comment: comment,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/v1/events/${eventId}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackPayload),
      });
      

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          onClose(); 
        }, 2000);
      }
      
    } catch (error) {
      console.error("Помилка відправки:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        {submitted? <div className={styles.submitted}>
            <h2>Дякуємо за відгук!</h2>
            <p>Ви допомагаєте нам стати кращими.</p>
        </div>:<div className={styles.formInfo}>
      <h3>Як Вам {eventTitle}?</h3>
      
      <StarRating rating={rating} setRating={setRating} />

      <textarea
        className={styles.textarea}
        placeholder="Ваш коментар..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className={styles.buttons}>
       <button type="button" className={styles.cancelBtn} onClick={onClose}>Скасувати</button>
      <button 
        type="submit" 
        className={styles.submitBtn}
      >
        {isSubmitting ? "Оцінка.." : "Оцінити"}
      </button>
      </div>
      </div>}
    </form>
  );
}