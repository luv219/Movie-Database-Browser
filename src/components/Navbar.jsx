import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.icon}>🎬</span>
          FilmLens
        </Link>
        <div className={styles.links}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/favorites" className={styles.navLink}>My Favorites</Link>
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
