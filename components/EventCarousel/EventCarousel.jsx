import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import EventCard from "../EventCard"
import { SwiperNavButtons } from './SwiperNavButtons';

import 'swiper/css';
import 'swiper/css/navigation';


export default function EventCarousel(){
    return (
        <Swiper
        slidesPerView={3}
        spaceBetween={0}
        centeredSlides={false}  
        watchSlidesProgress={true}
        breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 }
        }}
        loop={true}
        navigation={{
            prevEl: '.nav-button-prev',
            nextEl: '.nav-button-next',
        }}
        modules={[Navigation]}
        className='event-swiper'
        >
       <SwiperSlide><EventCard /></SwiperSlide>
       <SwiperSlide><EventCard /></SwiperSlide>
       <SwiperSlide><EventCard /></SwiperSlide>
       <SwiperSlide><EventCard /></SwiperSlide>
       <SwiperSlide><EventCard /></SwiperSlide>
       <SwiperSlide><EventCard /></SwiperSlide>
       <SwiperSlide><EventCard /></SwiperSlide>
       <SwiperSlide><EventCard /></SwiperSlide>
       <SwiperSlide><EventCard /></SwiperSlide>
       <SwiperNavButtons />
        </Swiper>
    )
}