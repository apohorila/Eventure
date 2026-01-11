import React, {useEffect,useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import EventCard from "../EventCard/EventCard"
import { SwiperNavButtons } from './SwiperNavButtons';


import 'swiper/css';
import 'swiper/css/navigation';


export default function EventCarousel({events}){
    const eventSliders = events.map(event => {
        return (
        <SwiperSlide key={event.id}>
            <EventCard 
             imageUrl={event.imageUrl}
             title={event.title}
             location={event.location}
             date={event.eventDate}/>
        </SwiperSlide>
        )
    })
    return (
        <Swiper
        slidesPerView={"auto"}
        spaceBetween={0}
        centeredSlides={false}  
        watchSlidesProgress={true}
        breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 15 },
            1440: {slidesPerView: 3, spaceBetween: 10},
        }}
        loop={true}
        navigation={{
            prevEl: '.nav-button-prev',
            nextEl: '.nav-button-next',
        }}
        modules={[Navigation]}
        className='event-swiper'
        >
             {eventSliders}
            <SwiperNavButtons />
        </Swiper>
    )
}