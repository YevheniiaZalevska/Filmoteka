import PropTypes from 'prop-types';
import MovieListItem from '../MovieListItem/MovieListItem';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};


MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default MovieList;