# Student-Watch 🎓📺

A clean, safe, and student-focused movie and anime streaming platform.

## Features
- **Strict 18+ Filter:** Automatically excludes mature content from TMDB and AniList.
- **Student-Centric Genres:** 
  - **Exam Time:** Calming and low-stress content.
  - **Mood Off:** Uplifting and motivational stories.
  - **Educational:** Science, History, and Documentary focus.
- **Integrated Player:** Uses Vidify.top for a seamless watching experience.
- **Modern UI:** Built with Next.js 15, Tailwind CSS, and Framer Motion.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **APIs:** TMDB (Movies/TV), AniList (Anime)
- **Player:** Vidify.top Embeds

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/student-watch.git
cd student-watch
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add your TMDB API Key:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```
You can get a free API key by creating an account on [TheMovieDB.org](https://www.themoviedb.org/).

### 4. Run the development server
```bash
npm run dev
```

## Contributing
This is an open-source project. Feel free to open issues or submit PRs!

## License
MIT