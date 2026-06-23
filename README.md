# Nexora - Campus Events Platform

<div align="center">
  <h3>The campus events platform for Indian college students 🎓</h3>
  <p>
    Discover hackathons, tech fests, cultural nights, workshops, and every campus event — all in one place.
  </p>
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?style=flat-square)](https://nexora-v2-taupe.vercel.app/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square)](https://www.mongodb.com/)
</div>

---

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

Nexora is a comprehensive campus events discovery platform designed specifically for Indian college students. It brings all campus activities—from technical hackathons and cultural nights to workshops and tech fests—into a single, easy-to-use platform.

### Why Nexora?
- **All-in-one platform** for discovering college events
- **Real-time updates** on new hackathons, tech fests, and workshops
- **Curated content** specifically for Indian college communities
- **User-friendly interface** for easy event discovery and registration

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** - UI library for building interactive user interfaces
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Tailwind CSS / CSS Modules** - Styling and responsive design
- **State Management** - Redux/Context API

### **Backend**
- **Node.js & Express.js** - Server runtime and REST API framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing for security
- **Cors** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management

### **Deployment**
- **Frontend** - Vercel
- **Backend** - Node.js compatible platform (Heroku, Railway, Render, etc.)
- **Database** - MongoDB Atlas (Cloud)

---

## ✨ Features

### Current Features
- 🔍 **Event Discovery** - Browse and search campus events by category, date, and college
- 👤 **User Authentication** - Secure registration and login with JWT
- 📝 **Event Listing** - College organizations can post and manage events
- 🎫 **Event Registration** - Students can register for events and get updates
- ❤️ **Favorites** - Save favorite events for quick access
- 🔔 **Notifications** - Real-time updates on event registrations and new events
- 👥 **User Profiles** - Manage personal information and registered events
- 🏢 **College Management** - College-specific event organization
- 📱 **Responsive Design** - Seamless experience on desktop and mobile

### Planned Features
- 📊 **Event Analytics** - Dashboard for event organizers
- 💬 **Community Chat** - Networking between event attendees
- 🎨 **Event Customization** - Rich media uploads and custom event pages
- 📍 **Location-based Discovery** - Find events near you
- 🤝 **Social Sharing** - Share events on social media

---

## 📁 Project Structure

```
Nexora/
├── client/                      # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service calls
│   │   ├── redux/              # Redux store and slices
│   │   ├── styles/             # Global and component styles
│   │   ├── utils/              # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js          # Vite configuration
│
├── server/                      # Express backend
│   ├── models/                 # MongoDB schemas and models
│   ├── routes/                 # API route definitions
│   ├── controllers/            # Route handler logic
│   ├── middleware/             # Custom middleware (auth, validation, etc.)
│   ├── config/                 # Configuration files
│   ├── utils/                  # Utility functions
│   ├── .env.example            # Environment variables template
│   ├── server.js               # Entry point
│   └── package.json
│
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zeny1303/Nexora.git
   cd Nexora
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Setup

#### Backend Configuration

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```

3. Configure your environment variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/nexora
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexora?retryWrites=true&w=majority

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRY=7d

   # Frontend URL
   FRONTEND_URL=http://localhost:3000

   # Email Configuration (Optional)
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_email
   SMTP_PASS=your_password

   # Cloud Storage (Optional)
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   ```

#### Frontend Configuration

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Create a `.env.local` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Start the Backend Server**
```bash
cd server
npm install
npm start
# or for development with auto-reload:
npm run dev
```

Backend will run on: `http://localhost:5000`

**Terminal 2 - Start the Frontend Development Server**
```bash
cd client
npm install
npm start
# or with Vite:
npm run dev
```

Frontend will run on: `http://localhost:3000` (or `http://localhost:5173` for Vite)

#### Option 2: Run Using Concurrently (from root directory)

If you have concurrently installed globally or in the root package.json:
```bash
npm run dev
```

#### Verify the Setup

1. **Backend Health Check**: Visit `http://localhost:5000/api/health` (if endpoint exists)
2. **Frontend**: Visit `http://localhost:3000` in your browser
3. **Database**: Check MongoDB connection logs in the backend terminal

---

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Event Endpoints
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create new event (requires authentication)
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/register` - Register for event
- `DELETE /api/events/:id/unregister` - Unregister from event

### User Endpoints
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/events` - Get user's registered events
- `POST /api/users/:id/favorites` - Add event to favorites
- `DELETE /api/users/:id/favorites/:eventId` - Remove from favorites

For detailed API documentation, see [API.md](./API.md) (if available)

---

## 🤝 Contributing

We welcome contributions from the community! To contribute to Nexora:

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/Nexora.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**
   ```bash
   git commit -m "Add your meaningful commit message"
   ```

4. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Provide a clear description of the changes
   - Link any relevant issues
   - Ensure all tests pass

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting PR
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤖 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/Zeny1303/Nexora/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Zeny1303/Nexora/discussions)
- **Email**: [Contact via GitHub](https://github.com/Zeny1303)

---

## 🎉 Acknowledgments

- All contributors who have helped with code, bug reports, and suggestions
- Indian college communities for the inspiration
- Open source community for amazing tools and libraries

---

<div align="center">
  
**Made with ❤️ for Indian college students**

[⬆ back to top](#nexora---campus-events-platform)

</div>
