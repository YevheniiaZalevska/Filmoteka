import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieTrailers } from '../../services/api_tmdb';
import styles from './MovieTrailer.module.css'

const Trailer = () => {
  const { movieId } = useParams();
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const trailers = await getMovieTrailers(movieId);
        const officialTrailer = trailers.find(trailer => trailer.type === 'Trailer' && trailer.site === 'YouTube');
        setTrailer(officialTrailer);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (!trailer) {
    return <p>No trailer available.</p>;
  }

    return (
      <div id="trailer-section" className={styles.trailers}>
      <h2 className={styles.name_tr}>{trailer.name}</h2>
      <iframe 
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title={trailer.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Trailer;
