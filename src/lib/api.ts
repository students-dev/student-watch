import axios from 'axios';
import { Media } from '@/types';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Blacklisted TMDB Genre IDs for safety (e.g., Erotica, etc. if they exist)
const BANNED_GENRE_IDS = [10749]; // Romance can sometimes be mature, but we'll stick to 'adult' flag mainly

export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    include_adult: false,
    include_video: true,
  },
});

export async function fetchFromAniList(query: string, variables: any) {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return response.json();
}

export const ANIME_QUERY = `
query ($page: Int, $perPage: Int, $search: String, $genre: String, $tag: String) {
  Page(page: $page, perPage: $perPage) {
    media(search: $search, genre: $genre, tag: $tag, type: ANIME, isAdult: false, status_not: RELEASING) {
      id
      title {
        english
        romaji
      }
      description
      coverImage {
        extraLarge
        large
      }
      bannerImage
      averageScore
      genres
      isAdult
      startDate {
        year
      }
    }
  }
}
`;

export async function getTrendingMovies(): Promise<Media[]> {
  try {
    const { data } = await tmdbClient.get('/trending/movie/week');
    return data.results
      .filter((m: any) => !m.adult) // Robust check
      .map((m: any) => ({
        id: m.id,
        tmdbId: m.id,
        title: m.title,
        overview: m.overview,
        posterPath: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
        backdropPath: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : '',
        releaseDate: m.release_date,
        voteAverage: m.vote_average,
        mediaType: 'movie',
        adult: m.adult,
        genres: [],
      }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

export async function getTrendingAnime(): Promise<Media[]> {
  try {
    const data = await fetchFromAniList(ANIME_QUERY, { page: 1, perPage: 15 });
    return data.data.Page.media
      .filter((m: any) => !m.isAdult) // Explicit secondary filter
      .map((m: any) => ({
        id: m.id,
        title: m.title.english || m.title.romaji,
        overview: m.description,
        posterPath: m.coverImage.extraLarge,
        backdropPath: m.bannerImage || m.coverImage.extraLarge,
        releaseDate: m.startDate.year?.toString() || '',
        voteAverage: m.averageScore / 10,
        mediaType: 'anime',
        adult: false,
        genres: m.genres,
      }));
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return [];
  }
}

export const CUSTOM_GENRES = {
  EXAM_TIME: {
    name: 'Exam Time',
    description: 'Low-stress, focus-friendly, or short-form content to help you relax.',
    animeTags: ['Slice of Life', 'Iyashikei'],
    movieKeywords: ['relaxing', 'nature', 'calm'],
  },
  MOOD_OFF: {
    name: 'Mood Off',
    description: 'Uplifting and motivational content to cheer you up.',
    animeTags: ['Comedy', 'Inspirational'],
    movieKeywords: ['uplifting', 'motivation', 'comedy'],
  },
  EDUCATIONAL: {
    name: 'Educational',
    description: 'Learn something new while watching.',
    animeTags: ['Educational', 'Historical'],
    movieKeywords: ['documentary', 'science', 'history'],
  },
  DEEP_FOCUS: {
    name: 'Deep Focus',
    description: 'Ambient and atmospheric content perfect for background or deep concentration.',
    animeTags: ['Space', 'Psychological'],
    movieKeywords: ['ambient', 'space', 'slow'],
  },
  WEEKEND_CHILL: {
    name: 'Weekend Chill',
    description: 'Longer series and movies to binge when the assignments are done.',
    animeTags: ['Action', 'Adventure'],
    movieKeywords: ['adventure', 'blockbuster', 'journey'],
  },
  SCIENTIFIC: {
    name: 'Scientific Journey',
    description: 'Fictional and non-fictional stories about the wonders of science.',
    animeTags: ['Sci-Fi', 'Mecha'],
    movieKeywords: ['science fiction', 'technology', 'future'],
  },
};
