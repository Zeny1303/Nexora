import { events, categoryColors } from "../data/event";
import { Navigation, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation as NavIcon, Calendar, MapPin, Users, Info } from "lucide-react";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

export default function EventCarousel({
  activeCategory,
  hoveredEventId,
  setHoveredEventId,
  selectedEventId,
  setSelectedEventId,
  setNavigateEvent,
  userLocation
}) {
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Quick Haversine distance calculator (returns km)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const filteredEvents =
    activeCategory === "All Events"
      ? events
      : events.filter((e) => e.category === activeCategory);

  useEffect(() => {
    if (swiperInstance && selectedEventId) {
      const index = filteredEvents.findIndex((e) => e.id === selectedEventId);
      if (index !== -1) {
        swiperInstance.slideTo(index);
      }
    }
  }, [selectedEventId, swiperInstance, filteredEvents]);

  if (filteredEvents.length === 0) return null;

  return (
    <div className="absolute bottom-8 left-0 right-0 px-8 z-10 pointer-events-none">
      <Swiper
        onSwiper={setSwiperInstance}
        modules={[Navigation, FreeMode]}
        spaceBetween={24}
        slidesPerView="auto"
        freeMode={true}
        className="w-full pointer-events-auto pb-4 px-2"
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
      >
        {filteredEvents.map((event) => (
          <SwiperSlide key={event.id} style={{ width: "320px" }}>
            <div
              className={`bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ease-out cursor-pointer group ${
                hoveredEventId === event.id || selectedEventId === event.id
                  ? "ring-4 ring-orange-500 scale-105 -translate-y-2"
                  : "hover:-translate-y-2 hover:shadow-3xl"
              }`}
              onMouseEnter={() => setHoveredEventId(event.id)}
              onMouseLeave={() => setHoveredEventId(null)}
              onClick={() => setSelectedEventId(event.id)}
            >
              <div className="h-40 relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md backdrop-blur-md bg-black/30"
                    style={{
                      borderLeft: `4px solid ${categoryColors[event.category] || "#fff"}`
                    }}
                  >
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                  {event.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-1 mt-2">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="truncate">{event.college}, {event.city}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      <span>{event.date}</span>
                    </div>
                    {event.attendees && (
                       <div className="flex items-center -space-x-2">
                         <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white overflow-hidden shadow-sm z-30">
                           <img src="https://i.pravatar.cc/100?img=1" alt="Attendee" className="w-full h-full object-cover" />
                         </div>
                         <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white overflow-hidden shadow-sm z-20">
                           <img src="https://i.pravatar.cc/100?img=2" alt="Attendee" className="w-full h-full object-cover" />
                         </div>
                         <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white overflow-hidden shadow-sm z-10">
                           <img src="https://i.pravatar.cc/100?img=3" alt="Attendee" className="w-full h-full object-cover" />
                         </div>
                         <div className="pl-3 py-1 flex items-center justify-center text-[10px] sm:text-xs font-semibold text-gray-500 min-w-max">
                           +{event.attendees > 3 ? event.attendees - 3 : 0} going
                         </div>
                       </div>
                    )}
                  </div>
                  {userLocation && (
                    <div className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                      {getDistance(userLocation.lat, userLocation.lng, event.lat, event.lng)} km away
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEventId(event.id);
                      setNavigateEvent(event);
                    }}
                    className="flex-1 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold rounded-xl flex items-center justify-center transition-colors gap-2"
                  >
                    <NavIcon className="w-4 h-4" />
                    Navigate
                  </button>
                  <Link
                    to={`/event/${event.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-2.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl flex items-center justify-center transition-colors gap-2"
                  >
                    <Info className="w-4 h-4" />
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}