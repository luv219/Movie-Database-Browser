import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
