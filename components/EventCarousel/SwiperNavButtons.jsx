import React from "react";
import { useSwiper } from "swiper/react";
import "./EventCarousel.css"

export const SwiperNavButtons = () =>{
    const swiper = useSwiper();


    return (
        <div className="swiper-nav-buttons">
            <button onClick={()=> swiper.slidePrev()} className="nav-button-prev"><img src="src/assets/icons/left-arrow-long.png"/></button>
            <button onClick={()=> swiper.slideNext()} className="nav-button-next"><img src="src/assets/icons/right-arrow-long.png"/></button>
        </div>
    )
}