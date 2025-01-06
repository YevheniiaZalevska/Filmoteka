import { useState } from 'react';
import { fetchMoviesByQuery } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const data = await fetchMoviesByQuery(query);
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies by query:', error);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.text}>Find out more interesting things about your favorite movies!</p>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;