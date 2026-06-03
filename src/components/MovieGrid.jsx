import React from 'react';
import MovieCard from './MovieCard';
import styles from './MovieGrid.module.css';

function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className={styles.empty}>No movies found.</p>;
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
