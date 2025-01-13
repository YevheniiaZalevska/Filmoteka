import { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchGenres } from '../../services/api_tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);

  // Загрузка фильмов и жанров
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, genresData] = await Promise.all([
          fetchTrendingMovies(),
          fetchGenres(),
        ]);
        setMovies(moviesData.results);
        setFilteredMovies(moviesData.results); // Изначально показываем все фильмы
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
      setFilteredMovies(movies); // Показывать все фильмы, если жанр не выбран
    } else {
      const filtered = movies.filter((movie) => movie.genre_ids.includes(genreId));
      setFilteredMovies(filtered);
    }
  };

  // Выбор случайного фильма
  const handleRandomMovie = () => {
    const movie = getRandomMovie(filteredMovies);
    setRandomMovie(movie);
  };

  const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Today</h1>

      <div className={styles.genreSelector}>
        <label htmlFor="genres">Filter by Genre:</label>
        <select
          id="genres"
          value={selectedGenre || ''}
          onChange={(e) => handleGenreChange(Number(e.target.value))}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <button className={styles.randomButton} onClick={handleRandomMovie}>
        Get Random Movie
      </button>

      {randomMovie && (
        <div className={styles.randomMovie}>
          <h2>{randomMovie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
            alt={randomMovie.title}
          />
          <p>Rating: {randomMovie.vote_average}</p>
          <p>{randomMovie.overview}</p>
          <a
            href={`/movies/${randomMovie.id}`}
            className={styles.movieLink}
          >
            View Details
          </a>
        </div>
      )}

      <MovieList movies={filteredMovies} className={styles.movieList} />
    </div>
  );
};

export default HomePage;
