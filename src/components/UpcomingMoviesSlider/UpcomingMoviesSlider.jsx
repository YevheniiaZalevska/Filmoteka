import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUpcomingMovies } from '../../services/api_tmdb';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './UpcomingMoviesSlider.module.css';

const UpcomingMoviesSlider = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const data = await fetchUpcomingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    getUpcomingMovies();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
        slidesToShow: 4, 
        slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550, 
        settings: {
        slidesToShow: 3, 
        slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450, 
        settings: {
        slidesToShow: 2, 
        slidesToScroll: 1,
        },
      }
    ]
  };

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedMovie(null); 
  };

  const goToMovieDetails = () => {
    navigate(`/movies/${selectedMovie.id}`);
  };

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.slider_title}>Upcoming Movies</h2>
      <Slider {...sliderSettings}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.sliderItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.sliderImage}
              onClick={() => handlePosterClick(movie)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </Slider>

      {isModalOpen && selectedMovie && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
            <h3>{selectedMovie.title}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className={styles.modalImage}
            />
            <p>{selectedMovie.overview}</p>
            <p>Release Date: {selectedMovie.release_date}</p>
            <button onClick={goToMovieDetails} className={styles.detailsButton}>
              View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMoviesSlider;
