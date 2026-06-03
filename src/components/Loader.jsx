import React from 'react';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading movies...</p>
    </div>
  );
}

export default Loader;
