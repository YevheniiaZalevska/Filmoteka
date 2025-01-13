import { useState, useEffect } from 'react';
import { fetchMovieNews } from '../../services/api_news';
import styles from './NewsPage.module.css';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('movies');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const newsData = await fetchMovieNews(query);
        if (newsData.length === 0) {
          setErrorMessage('No news found for your search query. Please enter a valid query or try using English.');
        } else {
          setErrorMessage('');
        }
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
        setErrorMessage('An error occurred while fetching the news. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value.trim();
    if (searchQuery) {
      setQuery(searchQuery);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latest Movie News</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          name="query"
          placeholder="Search for news..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className={styles.error}>{errorMessage}</p>
      ) : (
        <ul className={styles.newsList}>
          {news.map((article, index) => (
            <li key={index} className={styles.newsItem}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsPage;
