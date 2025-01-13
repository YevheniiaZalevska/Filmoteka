import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
        Home
      </NavLink>
      <NavLink to="/movies" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
        Movies
      </NavLink>
      <NavLink to="/news" className={({ isActive }) => (isActive ? styles.active : styles.link)}>News</NavLink>
    </nav>
  );
};

export default Navigation;