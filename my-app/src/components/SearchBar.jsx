import { useState } from "react";
import { Search } from "lucide-react";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN 

export default function SearchBar({ onLocationSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search for Mapbox Places API
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${TOKEN}&types=place,address,poi&limit=5`
        );
        const data = await response.json();
        setResults(data.features || []);
      } catch (error) {
        console.error("Geocoding error", error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelect = (feature) => {
    const [lng, lat] = feature.center;
    onLocationSelect({
      name: feature.place_name,
      lat,
      lng
    });
    setQuery(feature.place_name.split(',')[0]); // just show the main name in input
    setResults([]);
  };

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[400px]">
      <div className="relative w-full bg-white/80 backdrop-blur-xl border border-white/50 rounded-full shadow-lg flex items-center px-4 py-3 transition-all duration-300 focus-within:bg-white focus-within:shadow-xl focus-within:ring-2 focus-within:ring-orange-500/50">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for a city or place..."
          className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 font-medium"
        />
        {isSearching && (
           <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden text-sm">
          <ul className="py-2">
            {results.map((feature) => (
              <li key={feature.id}>
                <button
                  onClick={() => handleSelect(feature)}
                  className="w-full text-left px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition-colors flex flex-col"
                >
                  <span className="font-semibold text-gray-900 border-b-0">{feature.text}</span>
                  <span className="text-xs text-gray-500 mt-0.5 truncate">{feature.place_name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
