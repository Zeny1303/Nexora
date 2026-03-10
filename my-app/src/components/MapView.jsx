import { useEffect, useRef, useState } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { events, categoryColors } from "../data/event";
import { Navigation } from "lucide-react";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ".your token";
export default function MapView({
  activeCategory,
  hoveredEventId,
  setHoveredEventId,
  selectedEventId,
  setSelectedEventId,
  navigateEvent,
  setNavigateEvent,
  userLocation,
}) {
  const mapRef = useRef();

  const filteredEvents =
    activeCategory === "All Events"
      ? events
      : events.filter((e) => e.category === activeCategory);

  // Focus map when an event is selected from the bottom carousel
  useEffect(() => {
    if (selectedEventId && mapRef.current) {
      const event = events.find((e) => e.id === selectedEventId);
      if (event) {
        mapRef.current.flyTo({
          center: [event.lng, event.lat],
          zoom: 16.5,
          pitch: 60,
          bearing: -20,
          duration: 2000,
          essential: true,
        });
      }
    }
  }, [selectedEventId]);

  // Focus map when a new userLocation is searched/selected
  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 13,
        pitch: 45,
        duration: 2000,
        essential: true,
      });
    }
  }, [userLocation]);

  const [mapTheme, setMapTheme] = useState("light");
  const [routeInfo, setRouteInfo] = useState(null); // stores { feature, distance, duration }

  // Clear route info on close/deselect if needed, or simply render routeInfo ONLY when navigateEvent exists.
  // Route GeoJSON logic via Mapbox Directions API
  useEffect(() => {
    if (!navigateEvent) return;

    const fetchRoute = async () => {
      try {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${navigateEvent.lng},${navigateEvent.lat}?steps=true&geometries=geojson&access_token=${TOKEN}`
        );
        const json = await query.json();
        
        if (json.routes && json.routes.length > 0) {
          const data = json.routes[0];
          const route = data.geometry.coordinates;
          const geojson = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          };
          
          setRouteInfo({
            feature: geojson,
            distance: (data.distance / 1000).toFixed(1), // km
            duration: Math.floor(data.duration / 60) // minutes
          });
        }
      } catch (err) {
        console.error("Error fetching mapbox route", err);
      }
    };

    fetchRoute();
  }, [navigateEvent, userLocation]);

  return (
    <div className="w-full h-full relative bg-[#f8f9fa]">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 28.6139,
          longitude: 77.209,
          zoom: 15.5,
          pitch: 60,
          bearing: -17,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapTheme === "light" ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/dark-v11"}
        mapboxAccessToken={TOKEN}
        onMouseMove={() => {
          // simple check could go here if we used symbol layers, but we use HTML markers
        }}
        onClick={() => {
          setSelectedEventId(null);
          setNavigateEvent(null);
        }}
      >
        {/* Render Markers */}
        {filteredEvents.map((event) => {
          const isHovered = hoveredEventId === event.id;
          const isSelected = selectedEventId === event.id;
          const isActive = isHovered || isSelected;
          const markerColor = isActive ? "#f97316" : (categoryColors[event.category] || "#f97316");

          return (
            <Marker
              key={event.id}
              longitude={event.lng}
              latitude={event.lat}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedEventId(event.id);
              }}
            >
              <div
                className="relative cursor-pointer group flex items-end justify-center"
                onMouseEnter={() => setHoveredEventId(event.id)}
                onMouseLeave={() => setHoveredEventId(null)}
              >
                {/* Custom Marker Pin */}
                <div
                  className={`relative z-10 transition-all duration-300 ease-out flex items-center justify-center rounded-full shadow-lg border-2 border-white ${
                    isActive ? "w-8 h-8 scale-110" : "w-6 h-6 hover:scale-110"
                  }`}
                  style={{ backgroundColor: markerColor }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                {/* Pulse Glow Effect */}
                {isActive && (
                  <div
                    className="absolute z-0 w-8 h-8 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: markerColor }}
                  ></div>
                )}
              </div>
            </Marker>
          );
        })}

        {/* User Location Marker */}
        {userLocation && (
           <Marker longitude={userLocation.lng} latitude={userLocation.lat} anchor="bottom">
              <div className="relative flex items-center justify-center">
                 <div className="absolute z-0 w-8 h-8 rounded-full bg-blue-500 animate-ping opacity-30"></div>
                 <div className="relative z-10 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                 </div>
              </div>
           </Marker>
        )}

        {/* Selected Event Popup */}
        {selectedEventId && (
          <Popup
            longitude={events.find((e) => e.id === selectedEventId)?.lng || 0}
            latitude={events.find((e) => e.id === selectedEventId)?.lat || 0}
            anchor="top"
            closeOnClick={false}
            onClose={() => setSelectedEventId(null)}
            className="z-20 mt-2"
            maxWidth="240px"
          >
            {(() => {
              const event = events.find((e) => e.id === selectedEventId);
              if (!event) return null;
              return (
                <div className="text-gray-900 p-1 flex flex-col gap-1">
                  <h3 className="font-bold text-sm leading-tight">{event.title}</h3>
                  <p className="text-xs text-gray-500">{event.college}</p>
                  
                  {!navigateEvent || navigateEvent.id !== event.id ? (
                     <button 
                        className="mt-2 w-full flex justify-center items-center gap-1 bg-orange-50 text-orange-600 hover:bg-orange-100 py-1.5 rounded-lg text-xs font-semibold transition"
                        onClick={(e) => {
                           e.stopPropagation();
                           setNavigateEvent(event);
                        }}
                     >
                        <Navigation size={12} /> Route
                     </button>
                  ) : null}
                </div>
              );
            })()}
          </Popup>
        )}

        {/* Route Line */}
        {navigateEvent && routeInfo && routeInfo.feature && (
          <Source id="route" type="geojson" data={routeInfo.feature}>
            <Layer
              id="route-line"
              type="line"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#f97316", // orange-500
                "line-width": 5,
                "line-opacity": 0.9,
              }}
            />
          </Source>
        )}

        {/* 3D Buildings Layer */}
        <Layer
          id="3d-buildings"
          source="composite"
          source-layer="building"
          filter={['==', 'extrude', 'true']}
          type="fill-extrusion"
          minzoom={15}
          paint={{
            'fill-extrusion-color': '#e2e8f0', // soft light gray
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.8
          }}
        />
      </Map>

      {/* Map UI Tools (Top Right) */}
      <div className="absolute top-6 right-6 flex flex-col gap-3">
         {/* Theme Toggle */}
         <button
            onClick={() => setMapTheme(prev => prev === "light" ? "dark" : "light")}
            className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-xl hover:bg-gray-50 transition-colors border border-gray-100"
            title="Toggle Map Theme"
         >
            {mapTheme === "light" ? "🌙" : "☀️"}
         </button>

         {/* Fake zoom tools */}
         <div className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden text-gray-600 border border-gray-100">
            <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 border-b border-gray-100 font-bold text-lg">+</button>
            <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 font-bold text-lg">-</button>
         </div>
      </div>

      {/* Navigation Info Panel */}
      {navigateEvent && routeInfo && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 flex items-center gap-6 border border-white z-20 transition-all duration-300 animate-in slide-in-from-top-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Est. Travel Time</span>
            <span className="text-2xl font-bold text-gray-900">{routeInfo.duration} <span className="text-lg font-medium text-gray-600">min</span></span>
          </div>
          <div className="h-10 w-px bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Distance</span>
            <span className="text-2xl font-bold text-gray-900">{routeInfo.distance} <span className="text-lg font-medium text-gray-600">km</span></span>
          </div>
          <button 
            onClick={() => setNavigateEvent(null)}
            className="ml-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}