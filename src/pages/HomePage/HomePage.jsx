import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Today</h1>
      <MovieList movies={movies} className={styles.movieList} />
    </div>
  );
};

export default HomePage;