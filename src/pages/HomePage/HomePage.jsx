import { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchGenres } from '../../services/api_tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';
import UpcomingMoviesSlider from '../../components/UpcomingMoviesSlider/UpcomingMoviesSlider';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Загрузка фильмов и жанров
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, genresData] = await Promise.all([
          fetchTrendingMovies(),
          fetchGenres(),
        ]);
        setMovies(moviesData.results);
        setFilteredMovies(moviesData.results); 
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Фильтрация фильмов по жанру
  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    if (!genreId) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) => movie.genre_ids.includes(genreId));
      setFilteredMovies(filtered);
    }
  };

  return (
    <div className={styles.container}>
      <UpcomingMoviesSlider />
      <h1 className={styles.title}>Trending Today</h1>
        <div className={styles.genre_selector}>
        <label className={styles.genre_text} htmlFor="genres">Filter by Genre:</label>
        <select
          className={styles.genre_form}
          id="genres"
          value={selectedGenre || ''}
          onChange={(e) => handleGenreChange(Number(e.target.value))}
        >
          <option className={styles.genre_type} value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <MovieList movies={filteredMovies} className={styles.movieList} />
    </div>
  );
};

export default HomePage;