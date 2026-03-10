import { useState } from "react";
import SidebarFilters from "../components/SidebarFilters";
import MapView from "../components/MapView";
import EventCarousel from "../components/EventCarousel";
import SearchBar from "../components/SearchBar";

export default function EventDiscovery() {
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [navigateEvent, setNavigateEvent] = useState(null); // the event to route to
  const [userLocation, setUserLocation] = useState({ lat: 28.5245, lng: 77.1855, name: "Current Location" });

  const handleLocationSelect = (loc) => {
    setUserLocation(loc);
  };

  return (
    <div className="h-screen w-full flex bg-black overflow-hidden font-sans">
      <SidebarFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="flex-1 relative">
        <SearchBar onLocationSelect={handleLocationSelect} />

        <MapView
          activeCategory={activeCategory}
          hoveredEventId={hoveredEventId}
          setHoveredEventId={setHoveredEventId}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
          navigateEvent={navigateEvent}
          setNavigateEvent={setNavigateEvent}
          userLocation={userLocation}
        />

        <EventCarousel
          activeCategory={activeCategory}
          hoveredEventId={hoveredEventId}
          setHoveredEventId={setHoveredEventId}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
          setNavigateEvent={setNavigateEvent}
          userLocation={userLocation}
        />
      </div>
    </div>
  );
}