import { useState } from "react";
import { useNavigate } from "react-router-dom";
import festImg from "../assets/fest.jpg";

// ── Eye Icon ──────────────────────────────────────────────────────
function EyeIcon({ visible }) {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      {visible ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );
}

// ── Floating Label Input ──────────────────────────────────────────
function FloatingInput({ label, type = "text", value, onChange, showToggle, onToggle, hint }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={hint || " "}
        className="peer w-full border border-gray-200 rounded-xl px-4 pt-5 pb-2 text-sm text-gray-800 bg-white outline-none focus:border-gray-500 transition-all duration-200"
      />
      <label className="absolute left-4 top-1 text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs">
        {label}
      </label>
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <EyeIcon visible={type === "text"} />
        </button>
      )}
    </div>
  );
}

// ── 6-digit OTP boxes ─────────────────────────────────────────────
function OtpInput({ value, onChange }) {
  const digits = value.padEnd(6, " ").split("").slice(0, 6);

  const handleKey = (e, i) => {
    if (e.key === "Backspace") {
      const arr = value.split("").concat(Array(6).fill(" ")).slice(0, 6);
      arr[i] = " ";
      onChange(arr.join("").trimEnd());
      if (i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
    } else if (/^\d$/.test(e.key)) {
      const arr = value.padEnd(6, " ").split("").slice(0, 6);
      arr[i] = e.key;
      onChange(arr.join("").trimEnd());
      if (i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          readOnly
          onKeyDown={(e) => handleKey(e, i)}
          onClick={() => document.getElementById(`otp-${i}`)?.focus()}
          onFocus={(e) => e.target.select()}
          className="flex-1 h-12 text-center border border-gray-200 rounded-xl text-base font-bold text-gray-900 bg-white outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 cursor-text"
        />
      ))}
    </div>
  );
}

// ── Logo ──────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-black" />
      </div>
      <span className="text-sm font-semibold tracking-tight text-gray-900">Campus Connect</span>
    </div>
  );
}

// ── Role Tabs ─────────────────────────────────────────────────────
function RoleTabs({ role, onChange }) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-5">
      {[
        { key: "Student", emoji: "🎓" },
        { key: "Organizer", emoji: "🎪" },
      ].map(({ key, emoji }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            role === key ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {emoji} {key}
        </button>
      ))}
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function AuthPage() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup]   = useState(true);
  const [role, setRole]           = useState("Student");
  const [step, setStep]           = useState(1);        // 1 = info+OTP, 2 = password
  const [animating, setAnimating] = useState(false);
  const [otpSent, setOtpSent]     = useState(false);
  const [sending, setSending]     = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", otp: "", password: "", confirm: "",
  });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // helpers
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const fadeClass = animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0";

  const transition = (fn) => {
    setAnimating(true);
    setTimeout(() => { fn(); setAnimating(false); }, 220);
  };

  const resetAll = () => {
    setStep(1);
    setOtpSent(false);
    setForm({ name: "", email: "", otp: "", password: "", confirm: "" });
  };

  const handleModeToggle = () => transition(() => { setIsSignup((v) => !v); resetAll(); });
  const handleRoleChange = (r) => transition(() => { setRole(r); resetAll(); });

  const sendOtp = () => {
    if (!form.email) return;
    setSending(true);
    setTimeout(() => { setSending(false); setOtpSent(true); }, 1300);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if ((form.otp || "").replace(/\s/g, "").length < 6) return;
    transition(() => setStep(2));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    navigate("/discovery");
  };

  // right panel copy
  const rightHeading = isSignup
    ? (role === "Student" ? "Where Campus Life Happens" : "Reach Thousands of Students")
    : (role === "Student" ? "Your Events Are Waiting" : "Your Dashboard Awaits");

  const rightSub = isSignup
    ? (role === "Student"
        ? "500+ events, 200+ colleges and 10,000+ students — all in one place."
        : "List hackathons, fests and workshops. Connect with the right audience.")
    : "Pick up where you left off. Everything is ready for you.";

  const pills = isSignup
    ? ["#Hackathons", "#TechFests", "#Workshops", "#Clubs"]
    : ["#Events", "#Colleges", "#Connect", "#CampusLife"];

  const pillColors = [
    "rgba(239,68,68,0.5)", "rgba(34,197,94,0.5)",
    "rgba(59,130,246,0.5)", "rgba(168,85,247,0.5)",
  ];

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .auth-t { transition: opacity 0.22s ease, transform 0.22s ease; }
        .pill-tag { transition: transform 0.15s ease; cursor: pointer; }
        .pill-tag:hover { transform: translateY(-2px); }
      `}</style>

      {/* ── FULL-SCREEN BLURRED BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img src={festImg} alt="" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0" style={{ backdropFilter: "blur(14px)", background: "rgba(0,0,0,0.45)" }} />
      </div>

      {/* ── CENTERED CARD ── */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden flex w-full"
          style={{ maxWidth: "900px", minHeight: "640px" }}
        >

          {/* ════ LEFT — FORM PANEL ════ */}
          <div className="flex flex-col p-10 w-full md:w-5/12">

            {/* Logo */}
            <div className="mb-5"><Logo /></div>

            {/* Role tabs */}
            <RoleTabs role={role} onChange={handleRoleChange} />

            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-8 rounded-full bg-black" />
              <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 2 ? "bg-black" : "bg-gray-200"}`} />
              <span className="text-xs text-gray-400">{step}/2</span>
            </div>

            {/* ── STEP 1: Name + Email + OTP ── */}
            {step === 1 && (
              <div className={`auth-t flex-1 flex flex-col justify-center ${fadeClass}`}>
                <h2
                  className="text-gray-900 leading-tight mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 800 }}
                >
                  {isSignup ? "Your campus life starts here." : "Welcome back."}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
                  {isSignup
                    ? role === "Student"
                      ? "Join 10,000+ students discovering events, fests and clubs."
                      : "List your events and reach thousands of students across India."
                    : role === "Student"
                      ? "Sign in to discover what's happening on your campus."
                      : "Sign in to manage your events and registrations."}
                </p>

                <form onSubmit={verifyOtp} className="flex flex-col gap-3">
                  {isSignup && (
                    <FloatingInput
                      label="Full Name"
                      value={form.name}
                      onChange={set("name")}
                    />
                  )}

                  <FloatingInput
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    hint={role === "Student" ? "College email address" : "Work email address"}
                  />

                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={!form.email || sending}
                      className="w-full mt-1 py-3.5 rounded-xl bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 flex items-center justify-center"
                    >
                      {sending && <Spinner />}
                      {sending ? "Sending OTP…" : isSignup ? "Send OTP to Continue" : "Send OTP to Sign In"}
                    </button>
                  ) : (
                    <>
                      <div className="mt-1">
                        <p className="text-xs text-gray-500 text-center mb-3">
                          OTP sent to{" "}
                          <span className="font-semibold text-gray-800">{form.email}</span>
                        </p>
                        <OtpInput
                          value={form.otp || ""}
                          onChange={(v) => setForm((f) => ({ ...f, otp: v }))}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={(form.otp || "").replace(/\s/g, "").length < 6}
                        className="w-full mt-1 py-3.5 rounded-xl bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200"
                      >
                        Verify OTP →
                      </button>

                      <button
                        type="button"
                        onClick={() => { setOtpSent(false); setForm((f) => ({ ...f, otp: "" })); }}
                        className="text-xs text-gray-400 hover:text-gray-700 text-center transition-colors"
                      >
                        ← Change email
                      </button>
                    </>
                  )}
                </form>
              </div>
            )}

            {/* ── STEP 2: Password ── */}
            {step === 2 && (
              <div className={`auth-t flex-1 flex flex-col justify-center ${fadeClass}`}>
                <h2
                  className="text-gray-900 leading-tight mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 800 }}
                >
                  {isSignup ? "Set your password." : "Enter your password."}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
                  {isSignup
                    ? "Create a strong password to secure your account."
                    : "Almost there — enter your password to sign in."}
                </p>

                <form onSubmit={handleFinalSubmit} className="flex flex-col gap-3">
                  <FloatingInput
                    label="Password"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={set("password")}
                    showToggle
                    onToggle={() => setShowPass((v) => !v)}
                  />

                  {isSignup && (
                    <FloatingInput
                      label="Confirm Password"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirm}
                      onChange={set("confirm")}
                      showToggle
                      onToggle={() => setShowConfirm((v) => !v)}
                    />
                  )}

                  {!isSignup && (
                    <div className="text-right -mt-1">
                      <button type="button" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 active:scale-95 transition-all duration-200"
                  >
                    {isSignup ? "Create My Account 🎉" : "Sign In →"}
                  </button>

                  <button
                    type="button"
                    onClick={() => transition(() => setStep(1))}
                    className="text-xs text-gray-400 hover:text-gray-700 text-center transition-colors"
                  >
                    ← Back
                  </button>
                </form>
              </div>
            )}

            {/* Toggle mode */}
            <p className="text-center text-sm text-gray-400 mt-6">
              {isSignup ? "Already have an account? " : "New to Campus Connect? "}
              <button
                onClick={handleModeToggle}
                className="text-gray-900 font-semibold hover:underline transition-all"
              >
                {isSignup ? "Login now!" : "Sign up free!"}
              </button>
            </p>
          </div>

          {/* ════ RIGHT — IMAGE PANEL ════ */}
          <div className="hidden md:flex flex-col w-7/12 relative rounded-2xl overflow-hidden m-3">

            {/* Clean fest image — no logo, no stat card */}
            <img
              src={festImg}
              alt="Campus Fest"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Only bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            {/* Bottom text */}
            <div className={`auth-t ${fadeClass} absolute bottom-0 left-0 right-0 p-6 z-10`}>
              <h3
                className="text-white font-bold text-xl mb-1 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {rightHeading}
              </h3>
              <p className="text-white/65 text-xs mb-4 leading-relaxed">{rightSub}</p>

              <div className="flex flex-wrap gap-2">
                {pills.map((pill, i) => (
                  <span
                    key={pill}
                    className="pill-tag px-3 py-1.5 rounded-full text-xs font-medium text-white border border-white/25"
                    style={{ background: pillColors[i] }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}