import React, { useState, useEffect } from 'react';
import MediaGrid from '../components/MediaGrid';
import { getFavorites } from '../utils/favorites';
import styles from './Home.module.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="page-container">
      <div className={styles.hero} style={{ padding: '2rem 0' }}>
        <h1 className={styles.title}>My <span className={styles.highlight}>Favorites</span></h1>
        <p className={styles.subtitle}>Your personal collection of saved movies and TV shows.</p>
      </div>
      
      <div className={styles.content}>
        {favorites.length > 0 ? (
          <MediaGrid items={favorites} />
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>You haven't saved any favorites yet.</p>
            <p>Click the heart icon on any item to add it to your favorites.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
