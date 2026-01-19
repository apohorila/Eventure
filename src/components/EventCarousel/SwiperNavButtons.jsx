import React from "react";
import { useSwiper } from "swiper/react";
import "./EventCarousel.css";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-buttons">
      <button onClick={() => swiper.slidePrev()} className="nav-button-prev">
        <img src="/assets/icons/left-arrow-long.png" alt="Prev" />
      </button>

      <button onClick={() => swiper.slideNext()} className="nav-button-next">
        <img src="/assets/icons/right-arrow-long.png" alt="Next" />
      </button>
    </div>
  );
};
