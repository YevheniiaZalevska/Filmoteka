import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api_tmdb';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className={styles.modal}>
        {/* Крестик для выхода */}
        <button
          className={styles.closeButton}
          onClick={() => navigate('/')} // Перенаправление на HomePage
        >
          &times;
        </button>

        <div className={styles.details}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.img_mdp}
          />
          <div className={styles.info}>
            <h2 className={styles.h2_mdp}>{movie.title}</h2>
            <p className={styles.p_mdp}>{movie.overview}</p>
            <p className={styles.p2_mdp}>Rating: {movie.vote_average}</p>
            <Link to="trailer">Trailer</Link>|{' '}
            <Link to="cast">Cast</Link>| <Link to="reviews">Reviews</Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
