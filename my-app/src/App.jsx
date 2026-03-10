import { Routes, Route } from "react-router-dom"

import CampusConnect from "./pages/landingpage"
import EventDiscovery from "./pages/EventDiscovery"
import EventDetails from "./pages/EventDetails"
import AuthPage from "./pages/authpage"

export default function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<CampusConnect />} />

      {/* Authentication */}
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />

      {/* Event Discovery Map */}
      <Route path="/events" element={<EventDiscovery />} />

      {/* Standalone Event Details */}
      <Route path="/event/:id" element={<EventDetails />} />

    </Routes>
  )
}