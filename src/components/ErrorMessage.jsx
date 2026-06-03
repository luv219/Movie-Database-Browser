import React from 'react';
import styles from './ErrorMessage.module.css';

function ErrorMessage({ message }) {
  return (
    <div className={styles.errorContainer}>
      <span className={styles.icon}>⚠️</span>
      <h3 className={styles.title}>Oops! Something went wrong</h3>
      <p className={styles.text}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
