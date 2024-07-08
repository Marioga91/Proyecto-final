import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavoritesComics, listComics, updateComicFavoriteStatus } from "../../services/comicService";

import favoritesIcon from '../../assets/icons/favorites.png';

function Favorites() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    listComics()
      .then((comics) => {
        setComics(comics);

        return getFavoritesComics()
      })
      .then(favs => {
        console.log('listFavs: ', favs)
        setFavoriteComics(favs.map(fav => fav.comic));
      })
      .catch((error) => {
        console.error("Error fetching comics:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addToFavorites = async (comicId) => {
    try {
      await updateComicFavoriteStatus(comicId, true);
      setFavoriteComics([...favoriteComics, comicId]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (comicId) => {
    try {
      await updateComicFavoriteStatus(comicId, false);
      const updatedFavorites = favoriteComics.filter((id) => id !== comicId);
      setFavoriteComics(updatedFavorites);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const isFavorite = (comicId) => {
    return favoriteComics.includes(comicId);
  };

  const filteredComics = comics.filter(comic =>
    favoriteComics.includes(comic._id) &&
    comic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mt-4 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar cómic ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredComics.map((comic) => (
            <div className="col" key={comic._id}>
              <div className="card h-100">
                <img src={comic.coverImage} className="card-img-top" alt={comic.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{comic.title}</h5>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="card-value">{comic.userValor} €</span>
                    <Link to={`/comics/${comic._id}`} className="btn btn-primary">Ver detalles</Link>
                    <button
                      className={`btn ${isFavorite(comic._id) ? "btn-warning" : "btn-outline-light"}`}
                      onClick={() => {
                        if (isFavorite(comic._id)) {
                          removeFromFavorites(comic._id);
                        } else {
                          addToFavorites(comic._id);
                        }
                      }}
                      style={{
                        backgroundImage: `url(${favoritesIcon})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "40px",
                        height: "40px",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isFavorite(comic._id) ? "" : ""}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favorites;