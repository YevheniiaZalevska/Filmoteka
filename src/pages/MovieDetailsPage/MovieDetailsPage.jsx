import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
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
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <div className={styles.details}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Rating: {movie.vote_average}</p>
          <Link to="cast">Cast</Link> | <Link to="reviews">Reviews</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;