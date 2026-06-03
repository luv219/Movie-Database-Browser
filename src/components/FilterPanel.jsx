import React, { useState, useEffect } from 'react';
import { fetchGenres, fetchTVGenres } from '../services/api';
import styles from './FilterPanel.module.css';

function FilterPanel({ activeGenreId, onSelectGenre, mediaType = 'movie' }) {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setIsLoading(true);
        const data = mediaType === 'tv' ? await fetchTVGenres() : await fetchGenres();
        setGenres(data);
      } catch (err) {
        console.error('Failed to load genres', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadGenres();
  }, [mediaType]);

  if (isLoading) return <div className={styles.skeleton}>Loading genres...</div>;

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.pillList}>
        <button
          className={`${styles.pill} ${!activeGenreId ? styles.active : ''}`}
          onClick={() => onSelectGenre(null)}
        >
          All {mediaType === 'tv' ? 'TV Shows' : 'Movies'}
        </button>
        {genres.map(genre => (
          <button
            key={genre.id}
            className={`${styles.pill} ${activeGenreId === genre.id ? styles.active : ''}`}
            onClick={() => onSelectGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterPanel;
