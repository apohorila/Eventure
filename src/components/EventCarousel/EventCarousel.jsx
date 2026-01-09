import React, {useEffect,useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import EventCard from "../EventCard/EventCard"
import { SwiperNavButtons } from './SwiperNavButtons';
import { getPopularEvents } from '../../../api';

import 'swiper/css';
import 'swiper/css/navigation';


export default function EventCarousel(){
    // const [events,setEvents] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(()=>{
    //     async function loadEvents() {
    //         setLoading(true)
    //         try{
    //             const data = await getPopularEvents()
    //             setEvents(data)
    //         } catch (err){
    //             setError(err)
    //         }finally {
    //             setLoading(false)
    //         }
    //     }
    //     loadEvents()
    // }, [])

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