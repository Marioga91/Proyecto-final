
import favoritesIcon from '../assets/icons/favorites.png';

function FavoriteButton({ isFavorite, onToggle }) {
  return (
   <button
      className={`btn ${isFavorite ? "btn-warning" : "btn-outline-light"}`}
      onClick={onToggle}
      style={{ display: 'flex', alignItems: 'center', color: isFavorite ? 'white' : 'yellow' }}
    >
      <img
        src= {favoritesIcon}
        alt="Favorite Icon"
        style={{ width: '20px', marginRight: '5px' }} 
      />
      {isFavorite ? "" : ""}
    </button>
  );
}

export default FavoriteButton;