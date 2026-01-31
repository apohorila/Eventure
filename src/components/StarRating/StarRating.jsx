import React, { useState } from "react";
import styles from "./StarRating.module.css";

const STAR_FILLED = "/assets/icons/filledStar.png";
const STAR_EMPTY = "/assets/icons/clearStar.png";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((value) => (
        <label key={value} className={styles.starLabel}>
          <input
            type="radio"
            name="rating"
            value={value}
            checked={rating === value}
            onChange={() => setRating(value)}
            className={styles.radioInput}
          />
          <img
            src={value <= (hover || rating) ? STAR_FILLED : STAR_EMPTY}
            alt={`${value} stars`}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            className={styles.starImg}
          />
        </label>
      ))}
    </div>
  );
}
