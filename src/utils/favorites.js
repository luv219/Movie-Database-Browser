export const getFavorites = () => {
  const favs = localStorage.getItem('filmLens_favorites');
  return favs ? JSON.parse(favs) : [];
};

export const isFavorite = (id) => {
  const favs = getFavorites();
  return favs.some((m) => m.id === id);
};

export const toggleFavorite = (movie) => {
  let favs = getFavorites();
  if (favs.some((m) => m.id === movie.id)) {
    favs = favs.filter((m) => m.id !== movie.id);
  } else {
    favs.push(movie);
  }
  localStorage.setItem('filmLens_favorites', JSON.stringify(favs));
  return favs;
};
