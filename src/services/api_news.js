const API_KEY = '8fdb31bc3ad14d0c828c60e8670c6389'; 
const BASE_URL = 'https://newsapi.org/v2';

export const fetchMovieNews = async (query = 'movies') => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=en&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching news: ${response.statusText}`);
    }

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
