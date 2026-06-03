import React, { useState, useEffect, useCallback } from 'react';
import { fetchPopularMovies, searchMovies, fetchMoviesByGenre, fetchPopularTV, searchTV, fetchTVByGenre } from '../services/api';
import MediaGrid from '../components/MediaGrid';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import FilterPanel from '../components/FilterPanel';
import styles from './Home.module.css';

// Custom hook to debounce search input and prevent API spam
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  
  // Media Type State
  const [mediaType, setMediaType] = useState('movie'); // 'movie' or 'tv'

  // Search and Filter States
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);
  const [activeGenreId, setActiveGenreId] = useState(null);
  const [page, setPage] = useState(1);

  const handleMediaTypeToggle = (type) => {
    if (type !== mediaType) {
      setMediaType(type);
      setSearchInput('');
      setActiveGenreId(null);
      setPage(1);
    }
  };

  // Handlers for mutual exclusivity
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.trim() !== '') {
      setActiveGenreId(null); 
    }
  };

  const handleGenreSelect = (genreId) => {
    if (genreId === activeGenreId) {
      setActiveGenreId(null); 
    } else {
      setActiveGenreId(genreId);
      setSearchInput(''); 
    }
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeGenreId, mediaType]);

  const loadItems = useCallback(async (pageNum) => {
    try {
      if (pageNum === 1) setIsLoading(true);
      else setIsLoadingMore(true);
      setError(null);
      
      let data = [];
      if (mediaType === 'movie') {
        if (debouncedSearch.trim()) {
          data = await searchMovies(debouncedSearch, pageNum);
        } else if (activeGenreId) {
          data = await fetchMoviesByGenre(activeGenreId, pageNum);
        } else {
          data = await fetchPopularMovies(pageNum);
        }
      } else {
        // TV logic
        if (debouncedSearch.trim()) {
          data = await searchTV(debouncedSearch, pageNum);
        } else if (activeGenreId) {
          data = await fetchTVByGenre(activeGenreId, pageNum); 
        } else {
          data = await fetchPopularTV(pageNum);
        }
      }
      
      if (pageNum === 1) {
        setItems(data);
      } else {
        setItems(prev => [...prev, ...data]);
      }
    } catch (err) {
      setError(err.response?.data?.status_message || `Failed to fetch ${mediaType === 'movie' ? 'movies' : 'TV shows'}. Please check your API key or network connection.`);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [debouncedSearch, activeGenreId, mediaType]);

  // Fetch when page or dependencies change
  useEffect(() => {
    loadItems(page);
  }, [page, loadItems]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="page-container">
      <div className={styles.hero}>
        <h1 className={styles.title}>Media Browser <span className={styles.highlight}>- Home</span></h1>
        <p className={styles.subtitle}>Discover the most popular movies and TV shows.</p>
        
        <div className={styles.mediaToggle}>
          <button 
            className={`${styles.toggleButton} ${mediaType === 'movie' ? styles.active : ''}`}
            onClick={() => handleMediaTypeToggle('movie')}
          >
            Movies
          </button>
          <button 
            className={`${styles.toggleButton} ${mediaType === 'tv' ? styles.active : ''}`}
            onClick={() => handleMediaTypeToggle('tv')}
          >
            TV Shows
          </button>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={`Search for a ${mediaType === 'movie' ? 'movie' : 'TV show'}...`}
            value={searchInput}
            onChange={handleSearchChange}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
      </div>

      <div className={styles.content}>
        <FilterPanel 
          activeGenreId={activeGenreId} 
          onSelectGenre={handleGenreSelect}
          mediaType={mediaType}
        />
        
        <div className={styles.resultsHeader}>
          <h2>
            {debouncedSearch ? `Search Results for "${debouncedSearch}"` 
              : activeGenreId ? `Genre Results` 
              : `Popular ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`}
          </h2>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <MediaGrid items={items} mediaType={mediaType} />
            {items.length > 0 && (
              <div className={styles.loadMoreContainer}>
                <button 
                  className={styles.loadMoreButton} 
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
