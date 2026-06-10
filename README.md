# Film Lens - Movie Database Browser 🎬

A modern, responsive React application for browsing, discovering, and searching movies and TV shows, powered by The Movie Database (TMDB) API.

## 🚀 Live Demo

[https://film-lens.vercel.app/](https://film-lens.vercel.app/)

## ✨ Features

- **Discover Content**: Browse popular movies and TV shows.
- **Search**: Quickly find your favorite movies and TV shows.
- **Filtering**: Filter media by specific genres.
- **Detailed Views**: Get in-depth information about movies and TV shows, including cast and crew.
- **Favorites**: Save your favorite movies and TV shows for easy access later.
- **Responsive Design**: Beautiful and functional across all device sizes.

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Styling**: CSS Modules
- **API**: [TMDB API](https://developer.themoviedb.org/docs)

## 🏃‍♂️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd "Movie Database Browser"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   *You can get a free API key by registering at [TMDB](https://www.themoviedb.org/).*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to the local URL provided by Vite (usually `http://localhost:5173`) to view the application.

## 📁 Project Structure

```text
src/
├── components/    # Reusable UI components (Navbar, MediaCard, etc.)
├── context/       # React Context providers (Favorites management)
├── pages/         # Page components (Home, Details, Favorites)
├── services/      # API integration and data fetching (TMDB)
├── utils/         # Helper functions
├── App.jsx        # Main application component and routing setup
├── main.jsx       # Application entry point
└── index.css      # Global styles
```
