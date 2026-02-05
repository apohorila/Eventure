import React, { useState } from "react";
import StarRating from "../../components/StarRating/StarRating";
import styles from "./RatingModal.module.css";
import { FaBullseye } from "react-icons/fa6";
import { rateEvent } from "../../server/api";
import { useAuth } from "../../context/AuthContext";

export default function FeedbackForm({ eventId, userId, eventTitle, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    setIsSubmitting(true);

    const feedbackPayload = {
      eventId: eventId,
      userId: userId,
      score: rating,
      comment: comment,
    };

    const token = sessionStorage.getItem("access_token");

    if (!token) {
      setError("Ви не авторизовані. Будь ласка, увійдіть у систему.");
      setIsSubmitting(false);
      return;
    }

    try {
      await rateEvent(eventId, rating, comment, token);

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Помилка відправки:", error);
      setError(err.message || "Сталася помилка. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {submitted ? (
        <div className={styles.submitted}>
          <h2>Дякуємо за відгук!</h2>
          <p>Ви допомагаєте нам стати кращими.</p>
        </div>
      ) : (
        <div className={styles.formInfo}>
          <h3>Як Вам {eventTitle}?</h3>

          <StarRating rating={rating} setRating={setRating} />

          <textarea
            className={styles.textarea}
            placeholder="Ваш коментар..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "5px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Скасувати
            </button>
            <button type="submit" className={styles.submitBtn}>
              {isSubmitting ? "Оцінка.." : "Оцінити"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
