import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './MovieListItem.module.css';

const MovieListItem = ({ movie }) => {
  const { id, title, poster_path } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <li className={styles.item}>
      <Link to={`/movies/${id}`}>
        <img
          src={posterUrl}
          alt={title}
          className={styles.poster}
        />
        <p className={styles.title}>{title}</p>
      </Link>
    </li>
  );
};

MovieListItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
  }).isRequired,
};

export default MovieListItem;