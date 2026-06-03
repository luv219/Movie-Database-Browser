import React from 'react';
import MediaCard from './MediaCard';
import styles from './MediaGrid.module.css';

function MediaGrid({ items, mediaType = 'movie' }) {
  if (!items || items.length === 0) {
    return <p className={styles.empty}>No {mediaType === 'tv' ? 'TV shows' : 'movies'} found.</p>;
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <MediaCard key={item.id} media={item} mediaType={mediaType} />
      ))}
    </div>
  );
}

export default MediaGrid;
