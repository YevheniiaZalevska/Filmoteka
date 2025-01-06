import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <main className={styles.container_ntp}>
      <h1 className={styles.title_ntp}>Page Not Found</h1>
      <Link to="/" className={styles.link_ntp}>
        Go to Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
