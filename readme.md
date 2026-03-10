# 🎓 CampusConnect

> **Discover Every Event Around You** — A full-stack platform that connects students with college events, fests, hackathons, and clubs across India.

---

## 📌 Overview

CampusConnect is a role-based event discovery and management platform built for the Indian college ecosystem. Students can browse and register for campus events, organizers can publish and manage their events, and admins maintain platform integrity through a verification and approval pipeline.

---

## ✨ Key Features

- **Multi-Role Authentication** — Separate flows for Students, Organizers, and Admins with JWT-based sessions
- **OTP Email Verification** — College email domain validation (`.ac.in` / `.edu`) for students
- **Organizer Verification** — LinkedIn-style verification flow with admin approval and badge system
- **Event Discovery** — Filter events by city, type, date, and status in both Grid and Map views
- **Interactive Map** — Leaflet.js-powered map with category-colored pin markers and event popups
- **Real-Time Notifications** — WebSocket-based live updates via Django Channels and Redis
- **Event Registration** — Duplicate-prevention, confirmation emails, and CSV participant export
- **Admin Panel** — Full control over organizer verifications, event approvals, and platform statistics

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Tailwind CSS, Framer Motion, Leaflet.js |
| **UI Generation** | v0.dev |
| **Backend** | Django, Django REST Framework (DRF) |
| **Database** | PostgreSQL |
| **Real-Time** | Django Channels, WebSockets, Redis Channel Layer |
| **Task Queue** | Celery + Redis |
| **Email** | SendGrid |
| **Auth** | JWT (`djangorestframework-simplejwt`) |
| **Media Storage** | AWS S3 |
| **Filtering** | `django-filter` |
| **Server** | Uvicorn / Gunicorn |

---

## 🏗️ Backend Architecture — Django + DRF

The backend is organized into 7 independent Django apps (modules). Each module is built and tested independently.

### 🔐 Module 1 — Authentication
| Step | Description | Tools |
|---|---|---|
| 1 | Custom User model with `role` field (student / organizer / admin) and `is_verified` flag | `AbstractBaseUser`, `PermissionsMixin` |
| 2 | Student registration with college email OTP verification (`.ac.in` / `.edu` domain check) | `DRF APIView`, Django cache, Celery |
| 3 | Organizer registration with OTP (no domain restriction) | `DRF APIView`, Django cache, Celery |
| 4 | JWT login / logout / token refresh — shared endpoint, role returned in response | `djangorestframework-simplejwt` |
| 5 | Auth middleware — route protection by role (`IsStudent`, `IsOrganizer`, `IsAdmin`, `IsVerifiedOrganizer`) | Custom DRF Permission classes |

### ✅ Module 2 — Organizer Verification
| Step | Description | Tools |
|---|---|---|
| 1 | Organizer submits verification form: org name, type, website, description, logo, socials | `DRF ModelSerializer`, `FileField`, `OrgVerification` model |
| 2 | Unverified organizers can browse but cannot publish events (returns `403`) | `IsVerifiedOrganizer` permission class |
| 3 | Admin reviews, approves, or rejects submissions with a reason note | Django Admin custom actions |
| 4 | On approval: `is_verified = True`, Verified ✓ badge granted, email sent | Django signal → Celery → SendGrid |
| 5 | On rejection: reason emailed, resubmission allowed after 24 hours | Celery task, cooldown via `submitted_at` |

### 🎯 Module 3 — Event Management
| Step | Description | Tools |
|---|---|---|
| 1 | Event creation API: title, type, date, city, coordinates, poster, registration link, team size | `DRF ModelSerializer`, `ImageField`, `PointField` |
| 2 | Admin event approval — approve or reject with one click | Django Admin + DRF `PATCH` endpoint |
| 3 | Auto email to organizer on event going live | Celery task |
| 4 | Event listing API with filters: city, type, date range, status | `django-filter`, `DRF ListAPIView` |
| 5 | Event detail API — full event info | `DRF RetrieveAPIView` |
| 6 | Organizer can edit or cancel their own events | `DRF UpdateAPIView`, `IsOwner` permission |

### 🎓 Module 4 — Student Registration
| Step | Description | Tools |
|---|---|---|
| 1 | Student registers for an event — stores name, email, college, year, branch | `DRF CreateAPIView`, ManyToMany (Student ↔ Event) |
| 2 | Duplicate registration prevention | `unique_together` constraint + DRF validation |
| 3 | Confirmation email on registration | Celery + email template |
| 4 | "My Events" API — all events the student has registered for | `DRF ListAPIView` |
| 5 | Organizer views participant list — name, email, college, year, branch | `DRF ListAPIView` with `IsOrganizer` permission |
| 6 | Export participant list as CSV download | `Django StreamingHttpResponse` |

### 🗺️ Module 5 — Map API
| Step | Description | Tools |
|---|---|---|
| 1 | Geo data stored per event: city, lat/lng, category | Django model with `FloatField` |
| 2 | Map events API — returns all live events with coordinates, category, title, date (public, no auth) | `DRF ListAPIView` |
| 3 | Filter map events by city, type, and date range | `django-filter` |

### 🔔 Module 6 — Notifications
| Step | Description | Tools |
|---|---|---|
| 1 | Organizer posts event update (schedule change, results, announcements) | `DRF CreateAPIView`, `EventUpdate` model |
| 2 | Followed students receive real-time notification via WebSocket | Django Channels, Redis Channel Layer |
| 3 | Student follow / unfollow an event | ManyToMany Follow model, DRF toggle endpoint |

### 🛡️ Module 7 — Admin Panel
| Step | Description | Tools |
|---|---|---|
| 1 | Admin views all pending organizers and events with approve/reject controls | Django Admin with custom `list_display` and actions |
| 2 | Platform stats: total events, students, registrations by category | Django ORM aggregation, DRF stats endpoint |
| 3 | Admin can deactivate an organizer or remove an event | Soft delete with `is_active` flag |

---

## 🎨 Frontend Architecture — React + Tailwind

The UI is generated using [v0.dev](https://v0.dev) prompts and enhanced with Framer Motion animations.

**Role Legend:** ⬜ Public · 🔵 Student · 🟠 Organizer · 🟣 Admin

| Page | Role | Description |
|---|---|---|
| **Landing Page** | ⬜ Public | Hero section, feature cards, stats bar, footer. Deep blue + white color scheme. |
| **Event Discovery + Map** | ⬜ / 🔵 | Tabbed Grid View and Map View with shared filter state (city, type, date, status). |
| **Event Detail** | ⬜ / 🔵 | Poster, organizer card with Verified ✓ badge, countdown timer, follow button, sidebar. |
| **Student Auth** | ⬜ Public | Sign up with OTP flow and college email validation. Split-panel layout. |
| **Organizer Auth** | ⬜ Public | Sign up → OTP → "Get Verified Now" prompt. Indigo/violet accent to differentiate. |
| **Organizer Verification** | 🟠 Organizer | LinkedIn-style multi-section form with progress bar and profile preview card. |
| **Event Create / Publish** | 🟠 Organizer | Multi-section form (Basic Info, Date & Location, Details, Media) with sticky section nav. |
| **Organizer Dashboard** | 🟠 Organizer | Events table with status badges, participant counts, verification banner, and stat cards. |
| **Participants List** | 🟠 Organizer | Searchable, paginated table with "Export CSV" button. Notion/Airtable aesthetic. |
| **Student Dashboard** | 🔵 Student | Discover, My Events (Registered / Following tabs), notification bell, update feed. |
| **Admin Panel** | 🟣 Admin | Stats overview, pending verifications table, pending events table, approve/reject modals. |

---

## 👤 User Roles

| Role | Capabilities |
|---|---|
| **Student** | Browse events, register for events, follow events, receive real-time updates |
| **Organizer (Unverified)** | Browse events; cannot publish until verified |
| **Organizer (Verified)** | Publish events, view participants, export CSVs, post updates |
| **Admin** | Approve/reject organizers and events, view platform stats, deactivate accounts |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Redis

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/campusconnect.git
cd campusconnect/backend

# Create virtual environment and install dependencies
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL, REDIS_URL, SENDGRID_API_KEY, AWS credentials, etc.

# Run migrations
python manage.py migrate

# Create superuser (admin)
python manage.py createsuperuser

# Start Celery worker
celery -A campusconnect worker --loglevel=info

# Start development server
python manage.py runserver
```

### Frontend Setup

```bash
cd campusconnect/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📁 Project Structure

```
campusconnect/
├── backend/
│   ├── authentication/     # Module 1 — User auth, JWT, OTP
│   ├── verification/       # Module 2 — Organizer verification
│   ├── events/             # Module 3 — Event CRUD and approval
│   ├── registrations/      # Module 4 — Student event registration
│   ├── map_api/            # Module 5 — Geo data and map endpoint
│   ├── notifications/      # Module 6 — WebSocket updates and follow system
│   ├── admin_panel/        # Module 7 — Admin actions and stats
│   └── campusconnect/      # Django project settings
└── frontend/
    ├── src/
    │   ├── pages/          # One folder per page (Landing, Discovery, Detail, etc.)
    │   ├── components/     # Shared UI components
    │   └── hooks/          # Custom React hooks (useWebSocket, useAuth, etc.)
    └── public/
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with ❤️ for the Indian campus community
</div>