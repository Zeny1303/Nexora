import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import landingpage from "../assets/landingpage.png";
import droneVideo from "../assets/drone.mp4";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import festBg from "../assets/fest.jpg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Colleges", path: "/colleges" },
];

const showcasedColleges = [
  { name: "IIT Delhi", events: 84, logo: "https://images.unsplash.com/photo-1590408542031-62a95e01becc?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Delhi University", events: 156, logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Amity Noida", events: 42, logo: "https://images.unsplash.com/photo-1565538420870-da08ff96a207?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "DTU Delhi", events: 95, logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "IIIT Delhi", events: 38, logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "NSUT Dwarka", events: 64, logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=200&h=200" }
];

export default function CampusConnect() {
  const [active, setActive] = useState("Home");
  const [visible, setVisible] = useState(false);
  // Generate coordinates and parameters for 20 floating background particles
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    
    // Create soft neon particles cleanly inside effect
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      color: ['#c084fc', '#e879f9', '#60a5fa'][Math.floor(Math.random() * 3)],
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 10}s`,
    }));
    setParticles(generatedParticles);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden selection:bg-orange-500/30 relative">
      {/* ── PAGE FLUID BACKGROUND ── */}
      <div 
        className="fixed inset-0 pointer-events-none -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${festBg})` }}
      />
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[#050014]/90 backdrop-blur-[4px]" />

      {/* ── FRAMED CARD HERO ── */}
      <div className="relative z-10 w-full h-[calc(100vh-24px)] mx-auto mt-3 max-w-[calc(100%-24px)] rounded-3xl overflow-hidden shadow-2xl mb-32 shrink-0">

        {/* ── BACKGROUND VIDEO with image fallback ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={landingpage}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={droneVideo} type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />

        {/* ── NAV ── */}
        <nav
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-9 py-7"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-white"
              style={{ boxShadow: "0 0 8px rgba(255,255,255,0.9)" }}
            />
            <span
              className="text-white text-sm font-medium tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
            >
              Campus Connect
            </span>
          </div>

          {/* Center pill nav */}
          <div
            className="flex items-center gap-1 rounded-full px-2 py-1.5 border"
            style={{
              background: "rgba(255,255,255,0.12)",
              borderColor: "rgba(255,255,255,0.28)",
              backdropFilter: "blur(20px)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                to={link.path}
                key={link.name}
                onClick={() => setActive(link.name)}
                className="rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: active === link.name ? "rgba(255,255,255,0.95)" : "transparent",
                  color: active === link.name ? "#111" : "rgba(255,255,255,0.65)",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Account */}
          <Link
            to="/signup"
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity duration-200 hover:opacity-85"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#111",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Account
            <span className="w-2 h-2 rounded-full bg-black/80 inline-block" />
          </Link>
        </nav>

        {/* ── HERO CONTENT ── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">

          {/* Headline */}
          <h1
            className="text-white uppercase leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: "clamp(2.6rem, 5.8vw, 5.2rem)",
              letterSpacing: "0.03em",
              textShadow: "0 2px 40px rgba(0,0,0,0.45)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease",
            }}
          >
            Discover Every Event
            <br />
            Around You
          </h1>

          {/* Explore Events → Discovery */}
          <Link
            to="/events"
            className="mt-10 flex items-center gap-3 rounded-full px-8 py-3.5 text-base font-medium transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#111",
              fontFamily: "'DM Sans', sans-serif",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s 0.38s ease, transform 0.7s 0.38s ease",
            }}
          >
            Explore Events
            <span className="w-2.5 h-2.5 rounded-full bg-black/80 inline-block" />
          </Link>
        </div>

        {/* ── VERTICAL LINE ── */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px"
          style={{
            height: "130px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.55), transparent)",
            zIndex: 15,
          }}
        />

        {/* ── SCROLL ARROW ── */}
        <div
          className="absolute bottom-7 right-9 z-20 text-white text-xl cursor-pointer select-none"
          style={{ opacity: 0.7, animation: "bob 2s ease-in-out infinite" }}
        >
          ↓
        </div>

        {/* ── STATS ── */}
        <div
          className="absolute bottom-8 left-9 z-20 flex gap-7"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s 0.5s ease",
          }}
        >
          {[
            ["500+", "Events"],
            ["200+", "Colleges"],
            ["10k+", "Students"],
          ].map(([num, label]) => (
            <div key={label} className="text-left">
              <div
                className="text-white font-bold text-lg leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {num}
              </div>
              <div
                className="text-white/50 text-xs uppercase tracking-widest mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COLLEGE SHOWCASE SECTION ── */}
      <section className="relative w-full max-w-7xl mx-auto px-6 mb-32 overflow-hidden py-10">
        
        {/* ── BACKGROUND SPOTLIGHT BEAMS ── */}
        <div className="absolute inset-0 pointer-events-none -z-[15] overflow-hidden">
           {/* Angled Beam 1 - Purple */}
           <div 
             className="absolute top-[-20%] left-[-10%] w-[60%] h-[150%] bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 blur-[100px] transform -rotate-45"
             style={{ animation: "sweepLeft 25s ease-in-out infinite alternate" }}
           />
           {/* Angled Beam 2 - Blue */}
           <div 
             className="absolute top-[-30%] right-[-10%] w-[50%] h-[160%] bg-gradient-to-l from-blue-500/0 via-blue-500/10 to-blue-500/0 blur-[120px] transform rotate-45"
             style={{ animation: "sweepRight 20s ease-in-out infinite alternate" }}
           />
        </div>

        {/* ── STAGE LIGHTING BACKGROUND GLOWS ── */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
          <div className="absolute -top-20 left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-20 mix-blend-screen" />
          <div className="absolute top-[20%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-fuchsia-600 rounded-full blur-[140px] opacity-20 mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[25%] w-[50vw] h-[30vw] max-w-[800px] max-h-[400px] bg-blue-600 rounded-full blur-[150px] opacity-25 mix-blend-screen" />
        </div>

        {/* ── FLOATING PARTICLES ── */}
        <div className="absolute inset-0 pointer-events-none -z-5">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 ${parseInt(p.size)*3}px ${p.color}`,
                opacity: 0.4,
                animation: `float ${p.duration} infinite ease-in-out ${p.delay}`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Top Campuses on Campus Connect
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Discover thousands of ongoing events hosted by the nation's most prestigious universities and technical institutes.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcasedColleges.map((college, idx) => (
            <div 
              key={idx}
              className="group relative bg-[#111] border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:bg-[#1a1a1a] hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-center justify-between z-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white/5 group-hover:border-white/20 transition-colors">
                    <img src={college.logo} alt={college.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1">{college.name}</h3>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       <span className="text-gray-400 text-sm font-medium">{college.events} Active Events</span>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-white text-black group-hover:text-black transition-all">
                  <ExternalLink size={18} className="translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
           <Link to="/colleges" className="px-8 py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all duration-300">
             View All Partners
           </Link>
        </div>
      </section>

      {/* ── FOOTER / CONTACT SECTION ── */}
      <footer className="relative border-t border-white/10 pt-20 pb-10 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050014]/40 to-black pointer-events-none -z-10" />
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Have questions or want to partner with us?
            </h2>
            <a 
              href="mailto:snehakashyap9920@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white font-medium text-lg transition-all border border-white/10 hover:border-white/30 hover:-translate-y-1 shadow-2xl"
            >
              <Mail className="w-5 h-5" />
              snehakashyap9920@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mb-16">
            <a 
              href="https://github.com/Zeny1303" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#333] transition-colors border border-white/10">
                <Github size={20} />
              </div>
              <span className="font-medium hidden sm:block">View my profile</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/sneha-kashyap1309" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-[#0a66c2] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0a66c2]/10 transition-colors border border-white/10">
                <Linkedin size={20} />
              </div>
              <span className="font-medium hidden sm:block">LinkedIn</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="font-medium tracking-widest uppercase">Campus Connect</span>
            </div>
            <p>© {new Date().getFullYear()} Campus Connect. Designed by Sneha Kashyap.</p>
          </div>
        </div>
      </footer>

      {/* Google Fonts + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        
        /* Utility class to hide scrollbar while allowing scroll */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Concert Animations */
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          25% { transform: translate(15px, -20px) scale(1.2); opacity: 0.6; }
          50% { transform: translate(-10px, -40px) scale(0.9); opacity: 0.2; }
          75% { transform: translate(-20px, 10px) scale(1.1); opacity: 0.5; }
        }
        
        @keyframes sweepLeft {
          0% { transform: rotate(-45deg) translateX(-10%); }
          100% { transform: rotate(-35deg) translateX(10%); }
        }
        
        @keyframes sweepRight {
          0% { transform: rotate(45deg) translateX(10%); }
          100% { transform: rotate(35deg) translateX(-10%); }
        }
      `}</style>
    </div>
  );
}