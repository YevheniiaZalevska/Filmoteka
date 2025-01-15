import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
// import NewsPage from './pages/NewsPage/NewsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MovieTrailer from './components/MovieTrailer/MovieTrailer';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';
import Navigation from './components/Navigation/Navigation';

const App = () => {
  const location = useLocation();

  // Проверка: скрыть навигацию, если пользователь на MovieDetailsPage
  const isMovieDetailsPage = location.pathname.startsWith('/movies/') && location.pathname !== '/movies';

  return (
    <>
      {!isMovieDetailsPage && <Navigation />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="trailer" element={<MovieTrailer />} />
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        {/* <Route path="/news" element={<NewsPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;

