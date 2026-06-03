import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTVDetails } from '../services/api';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import styles from './TVDetails.module.css';

function TVDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchTVDetails(id);
        setShow(data);
      } catch (err) {
        setError(err.response?.data?.status_message || 'Failed to fetch TV details.');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Scroll to top when loading new show
    window.scrollTo(0, 0);
    if (id) {
      loadDetails();
    }
  }, [id]);

  if (isLoading) {
    return <div className="page-container"><Loader /></div>;
  }

  if (error) {
    return (
      <div className="page-container">
        <button onClick={() => navigate(-1)} className={styles.backButton}>&larr; Back to Browse</button>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!show) return null;

  // Safe image fallbacks if TMDB paths are null
  const backdropUrl = show.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080?text=No+Backdrop';
    
  const posterUrl = show.poster_path 
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  // Get top 6 cast members
  const topCast = show.credits?.cast?.slice(0, 6) || [];

  return (
    <div className={styles.detailsPage}>
      {/* Hero Backdrop overlaying behind content */}
      <div 
        className={styles.heroBackdrop} 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className={styles.overlay}></div>
      </div>

      <div className={`page-container ${styles.contentWrapper}`}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          &larr; Back to Browse
        </button>

        <div className={styles.content}>
          <div className={styles.posterContainer}>
            <img src={posterUrl} alt={show.name} className={styles.poster} />
          </div>

          <div className={styles.info}>
            <h1 className={styles.title}>
              {show.name} 
              {show.first_air_date && <span className={styles.year}> ({show.first_air_date.split('-')[0]})</span>}
            </h1>
            
            {show.tagline && <p className={styles.tagline}><i>"{show.tagline}"</i></p>}

            <div className={styles.meta}>
              <span className={styles.rating}>⭐ {show.vote_average ? show.vote_average.toFixed(1) : 'NR'}</span>
              <span className={styles.dot}>•</span>
              <span className={styles.seasons}>{show.number_of_seasons} Seasons ({show.number_of_episodes} Episodes)</span>
              <span className={styles.dot}>•</span>
              <span className={styles.genres}>
                {show.genres?.map(g => g.name).join(', ')}
              </span>
            </div>

            <div className={styles.overviewSection}>
              <h3>Overview</h3>
              <p className={styles.overview}>{show.overview || 'No synopsis available.'}</p>
            </div>

            {topCast.length > 0 && (
              <div className={styles.castSection}>
                <h3>Top Cast</h3>
                <div className={styles.castGrid}>
                  {topCast.map(actor => {
                    const actorImage = actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : 'https://via.placeholder.com/185x278?text=No+Photo';
                      
                    return (
                      <div key={actor.id} className={styles.castCard}>
                        <img src={actorImage} alt={actor.name} className={styles.castImage} loading="lazy" />
                        <p className={styles.castName}>{actor.name}</p>
                        <p className={styles.characterName}>{actor.character}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TVDetails;
