import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import styles from './MediaCard.module.css';

function MediaCard({ media, mediaType = 'movie' }) {
  const [favorite, setFavorite] = useState(false);
  const currentMediaType = media.mediaType || mediaType;

  // Initialize favorite state on mount
  useEffect(() => {
    // favorites util needs to know mediaType too eventually, but for now we pass media
    setFavorite(isFavorite(media.id));
  }, [media.id]);

  const imageUrl = media.poster_path 
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const dateStr = media.release_date || media.first_air_date;
  const releaseYear = dateStr ? dateStr.split('-')[0] : 'N/A';
  const rating = media.vote_average ? media.vote_average.toFixed(1) : 'NR';
  const title = media.title || media.name;

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Stop Link navigation
    // Add mediaType to the object we save so Favorites page can use it
    const mediaToSave = { ...media, mediaType: currentMediaType };
    toggleFavorite(mediaToSave);
    setFavorite(!favorite);
  };

  return (
    <Link to={`/${currentMediaType}/${media.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
        <div className={styles.rating}>⭐ {rating}</div>
        <button 
          className={`${styles.favButton} ${favorite ? styles.favActive : ''}`} 
          onClick={handleFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.year}>{releaseYear}</p>
      </div>
    </Link>
  );
}

export default MediaCard;
