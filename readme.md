<div align="center">

<img src="ui/ui/Screenshot 2026-04-16 132608.png" alt="Campus Connect — Discover Every Event Around You" width="100%" />

# Nexora

**The campus events platform for Indian college students.**

Discover hackathons, tech fests, cultural nights, workshops, and every campus event — all in one place.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Django](https://img.shields.io/badge/Django-4.2-092E20?style=flat-square&logo=django&logoColor=white)](https://djangoproject.com/)
[![DRF](https://img.shields.io/badge/DRF-3.15-red?style=flat-square)](https://www.django-rest-framework.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Mapbox](https://img.shields.io/badge/Mapbox-GL-000000?style=flat-square&logo=mapbox&logoColor=white)](https://mapbox.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6c47ff?style=flat-square)](https://clerk.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Live Demo](#) · [Report Bug](https://github.com/Zeny1303/campus-connect/issues) · [Request Feature](https://github.com/Zeny1303/campus-connect/issues)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [Author](#author)

---

## Overview

Campus Connect solves a real problem: campus events are scattered across Instagram DMs, WhatsApp groups, and college notice boards. Campus Connect centralizes everything — students can discover events near them on a live 3D map, organizers can list and manage events, and admins oversee the platform through an approval pipeline.

Built on a **decoupled React + Django architecture** — a Vite-powered React frontend communicates with a Django REST Framework backend over HTTP, with Clerk handling all authentication.

---

## Features

### For Students
- **Discover Events** — Browse all campus events with category, city, and date filters
- **Interactive 3D Map** — Events plotted on a live Mapbox map pinned to their exact campus location
- **Turn-by-Turn Routing** — Get driving directions to any event directly on the map
- **College Hub** — Browse events grouped by college, sorted by activity
- **Event Registration** — Register for events with duplicate-prevention

### For Organizers
- **Event Publishing** — Multi-section form (Basic Info, Date & Location, Details, Media)
- **Participant Management** — Searchable, paginated participant list with CSV export

### For Admins
- **Approval Pipeline** — Approve or reject organizer verifications and event submissions
- **Account Control** — Soft-delete organizers or events

### Platform
- **Authentication** — Clerk-powered sign-in / sign-up with Google OAuth support
- **Role-Based Access** — Separate flows and permissions for Students, Organizers, and Admins

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM v7 |
| Maps | Mapbox GL JS 3, react-map-gl 8 |
| Map Fallback | Leaflet.js 1.9, react-leaflet 5 |
| Carousel | Swiper 12 |
| Icons | Lucide React |
| Auth | Clerk |
| Backend | Django 4.2, Django REST Framework 3.15 |
| Filtering | django-filter |
| Database | MongoDB Atlas |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                         │
│                                                                 │
│   React 19 + Vite  ──  Tailwind CSS  ──  Mapbox GL JS          │
│   React Router v7  ──  Swiper  ──  Lucide Icons                │
└────────────────────────────┬────────────────────────────────────┘
                             │  HTTP (REST)
┌────────────────────────────▼────────────────────────────────────┐
│                      Django Backend (WSGI)                      │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  accounts    │  │   events     │  │    registrations     │  │
│  │  user roles  │  │  CRUD + map  │  │  signup + CSV export │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
              ┌────────────────▼────────────────┐
              │         MongoDB Atlas            │
              │         (primary database)       │
              └─────────────────────────────────┘

  Auth handled separately by Clerk (JWT + OAuth)
```

---

## Project Structure

```
campus-connect/
│
├── my-app/                          # React frontend (Vite)
│   └── src/
│       ├── assets/                  # Images, video, icons
│       ├── components/
│       │   ├── MapView.jsx          # Mapbox 3D map — markers, routing, popups
│       │   ├── EventCarousel.jsx    # Bottom event strip with hover sync
│       │   ├── SidebarFilters.jsx   # Category filter sidebar
│       │   ├── SearchBar.jsx        # Location search with geocoding
│       │   ├── EventMarker.jsx      # Custom map pin component
│       │   └── EventPopup.jsx       # Map popup card
│       ├── data/
│       │   └── event.js             # Event seed data + category color map
│       └── pages/
│           ├── landingpage.jsx      # Hero, college showcase, footer
│           ├── authpage.jsx         # Clerk-powered auth flow
│           ├── EventDiscovery.jsx   # Map + carousel + filters
│           ├── EventDetails.jsx     # Full event detail page
│           └── EventMapPage.jsx     # Standalone map view
│
├── server/                          # Django backend
│   ├── accounts/                    # User model, roles
│   ├── events/                      # Event CRUD, approval pipeline, geo data
│   ├── registrations/               # Student registration, participant list, CSV
│   ├── campus_connect/              # Django project settings & root URLs
│   ├── manage.py
│   └── requirements.txt
│
└── ui/                              # Design screenshots & mockups
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/Zeny1303/campus-connect.git
cd campus-connect/server

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run migrations
python manage.py migrate

# 5. Create a superuser
python manage.py createsuperuser

# 6. Start the development server
python manage.py runserver
```

### Frontend Setup

```bash
cd campus-connect/my-app

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Reference

### Events

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/events/` | List approved events (filterable) | Public |
| `GET` | `/api/events/map/` | Events with geo data for map pins | Public |
| `GET` | `/api/events/:id/` | Event detail | Public |
| `POST` | `/api/events/` | Create event | Organizer |
| `PATCH` | `/api/events/:id/` | Edit event | Owner |
| `DELETE` | `/api/events/:id/` | Soft-delete event | Owner / Admin |

### Registrations

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/registrations/` | Register for an event | Student |
| `GET` | `/api/registrations/my-events/` | Student's registered events | Student |
| `GET` | `/api/registrations/:eventId/participants/` | Participant list | Organizer |
| `GET` | `/api/registrations/:eventId/export/` | Download participants as CSV | Organizer |

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'feat: add your feature'`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

Please keep PRs focused on a single concern and follow the existing code style.

---

## Author

**Sneha Kashyap**
Designer & Developer

- GitHub: [@Zeny1303](https://github.com/Zeny1303)
- LinkedIn: [sneha1309]([https://www.linkedin.com/in/sneha1309/])
- Email: [snehakashyap9920@gmail.com](mailto:snehakashyap9920@gmail.com)

---

<div align="center">
  © 2025 Campus Connect. Designed & built by Sneha Kashyap.
</div>
