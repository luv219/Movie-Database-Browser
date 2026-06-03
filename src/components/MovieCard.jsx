import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import styles from './MovieCard.module.css';

function MovieCard({ movie }) {
  const [favorite, setFavorite] = useState(false);

  // Initialize favorite state on mount
  useEffect(() => {
    setFavorite(isFavorite(movie.id));
  }, [movie.id]);

  const imageUrl = movie.poster_path 
    ? `https://image.themoviedb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Stop Link navigation
    toggleFavorite(movie);
    setFavorite(!favorite);
  };

  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={movie.title} className={styles.image} loading="lazy" />
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
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.year}>{releaseYear}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
