import { categoryColors } from "../data/event";

export default function SidebarFilters({ activeCategory, setActiveCategory }) {
  const categories = [
    "All Events",
    "Technical Events",
    "Hackathons",
    "Social Activities",
    "Sports & Fitness",
    "Art & Culture",
    "Music & Dance",
    "Career & Business",
    "Workshops"
  ];

  return (
    <div className="w-80 bg-white/70 backdrop-blur-xl text-gray-800 border-r border-white/40 p-8 shadow-[10px_0_30px_rgba(0,0,0,0.05)] z-10 flex flex-col h-full relative">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg flex items-center justify-center">
          <span className="text-white font-sans font-bold text-xl drop-shadow-sm">C</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-tight">Campus Connect</h1>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-5 py-3.5 rounded-2xl font-medium transition-all duration-300 ease-out flex items-center gap-4 ${
                  activeCategory === cat
                    ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-gray-900 scale-[1.02] border border-white"
                    : "text-gray-500 hover:bg-white/50 hover:text-gray-900"
                }`}
              >
                {cat !== "All Events" && (
                  <span 
                    className="w-2.5 h-2.5 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-125" 
                    style={{ backgroundColor: categoryColors[cat] || "#9ca3af" }} 
                  />
                )}
                {cat === "All Events" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400 shadow-sm" />
                )}
                <span className={activeCategory === cat ? "text-lg font-bold" : "text-sm"}>
                  {cat}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}