import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api_tmdb';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    getMovieReviews();
  }, [movieId]);

  const [expandedReview, setExpandedReview] = useState(null);

  const toggleReview = (id) => {
    setExpandedReview((prev) => (prev === id ? null : id));
  };

  return (
    <div id="reviews-section" className={styles.container_mr}>
      <h3 className={styles.title_mr}>Reviews</h3>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map((review) => {
            const isExpanded = expandedReview === review.id;
            const preview = review.content.slice(0, 150); // Показываем первые 150 символов
            const fullContent = review.content;

            return (
              <li key={review.id} className={styles.reviewItem}>
                <p>
                  <span className={styles.reviewAuthor}>{review.author}</span>:{" "}
                  {isExpanded ? fullContent : `${preview}...`}
                </p>
                <button
                  onClick={() => toggleReview(review.id)}
                  className={styles.toggleButton}
                >
                  {isExpanded ? "Collapse" : "Read More"}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.noReviews}>No reviews found.</p>
      )}
    </div>
  );
};

export default MovieReviews;
