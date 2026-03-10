import { useParams, Link } from "react-router-dom";
import { events, categoryColors } from "../data/event";
import { ArrowLeft, Calendar, MapPin, Users, Globe, ExternalLink, Share2 } from "lucide-react";

export default function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
        <Link to="/events" className="text-orange-600 hover:text-orange-700 font-medium hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      {/* Background Header Image */}
      <div className="relative w-full h-[45vh] bg-black">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-transparent to-black/40"></div>
        
        {/* Navigation Bar */}
        <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <Link 
            to="/events" 
            className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-lg border border-white/20"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex gap-3">
             <button className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-lg border border-white/20">
               <Share2 size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 -mt-32 relative z-10 pb-20">
        
        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end mb-6">
            <div>
              <span 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-md backdrop-blur-md mb-4"
                style={{ backgroundColor: categoryColors[event.category] || "#9ca3af" }}
              >
                {event.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                    <Calendar size={18} />
                  </div>
                  <span className="text-lg">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <MapPin size={18} />
                  </div>
                  <span className="text-lg">{event.college}, {event.city}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full md:w-auto px-10 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-lg flex items-center justify-center gap-3">
              Register Now <ExternalLink size={20} />
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Details (Left Col) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Event</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Join us for the highly anticipated {event.title} at {event.college}! This premier {event.category.toLowerCase()} gathering brings together students, professionals, and enthusiasts from across {event.city} and beyond.
                <br/><br/>
                Prepare for an immersive experience filled with networking opportunities, expert sessions, and hands-on activities designed to elevate your skills and expand your horizons. Whether you're a seasoned attendee or new to the scene, this is an unmissable opportunity to connect with like-minded individuals and industry leaders.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-8">Highlights</h3>
              <ul className="space-y-3">
                {['Interactive workshops and keynotes', 'Networking with top industry professionals', 'Exclusive access to resources and materials', 'Certificate of participation'].map((hl, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <div className="mt-1 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>
                    <span className="text-lg">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Area (Right Col) */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Event Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Expected Attendees</p>
                    <p className="text-2xl font-bold text-gray-900">{event.attendees || "500+"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                    <Globe size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Language</p>
                    <p className="text-2xl font-bold text-gray-900">English / Hindi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mt-10 -mr-10"></div>
               <h3 className="text-xl font-bold mb-3 relative z-10">Have queries?</h3>
               <p className="text-gray-400 mb-6 relative z-10">Contact the organizing team for more information regarding {event.title}.</p>
               <button className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors rounded-xl font-medium relative z-10 border border-white/10">
                 Contact Organizer
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
