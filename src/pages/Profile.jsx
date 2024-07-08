import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { listComics, getFavoritesComics, updateComicFavoriteStatus, getOwns } from '../services/comicService';
import favoritesIcon from '../assets/icons/favorites.png';
import { logout } from '../stores/AccessTokenStore';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [ownComics, setOwnComics] = useState([]);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm] = useState('');

  useEffect(() => {
    if (user) {
      // Obtener cómics favoritos del usuario
      getFavoritesComics()
        .then((favs) => {
          setFavoriteComics(favs.map((fav) => fav.comic));
        })
        .catch((error) => {
          console.error('Error fetching favorite comics:', error);
        });

      // Obtener cómics creados por el usuario
      getOwns()
        .then((owns) => {
          setOwnComics(owns);
        })
        .catch((error) => {
          console.error('Error fetching owned comics:', error);
        });

      // Obtener todos los cómics
      listComics()
        .then((comics) => {
          setComics(comics);
        })
        .catch((error) => {
          console.error('Error fetching comics:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const removeFromFavorites = async (comicId) => {
    try {
      await updateComicFavoriteStatus(comicId, false);
      const updatedFavorites = favoriteComics.filter((id) => id !== comicId);
      setFavoriteComics(updatedFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const addToFavorites = async (comicId) => {
    try {
      await updateComicFavoriteStatus(comicId, true);
      setFavoriteComics([...favoriteComics, comicId]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const isFavorite = (comicId) => {
    return favoriteComics.includes(comicId);
  };

  const filteredFavoriteComics = comics.filter((comic) =>
    favoriteComics.includes(comic._id) &&
    comic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOwnComics = ownComics.filter((own) =>
    comics.some((comic) => comic._id === own._id)
  );

  return (
    <div className="container mt-4">
      {user && (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 text-center">
                
                  <img src={user.avatar} alt="Avatar" className="profile-avatar img-fluid rounded-circle" />
                
              </div>
              <div className="col-md-9">
                <h2 className="card-title">{user.fullName}</h2>
                <div className="mb-4">
                  <h5 className="card-subtitle text-muted mb-2"><u>Datos personales</u></h5>
                  <p className="mb-1"><b>Email:</b> {user.email}</p>
                  <p className="mb-1"><b>Dirección:</b> {user.address}</p>
                  <p className="mb-1"><b>Ciudad:</b> {user.city}</p>
                  <p className="mb-1"><b>País:</b> {user.country}</p>
                  <p className="mb-0"><b>Teléfono:</b> {user.phoneNumber}</p>
                </div>
                <div>
                  {user && <button onClick={logout} className="btn btn-danger">Logout</button>}
                </div>
              </div>
            </div>
            <hr />
            <h3>Mis Cómics </h3>
            <div className="row row-cols-2 row-cols-md-3 g-4">
              {filteredOwnComics.length > 0 ? (
                filteredOwnComics.map((comic) => (
                  <div className="col mb-4" key={comic._id}>
                    <div className="card h-100">
                      <img src={comic.coverImage} className="card-img-top" alt={comic.title} />
                      <div className="card-body">
                        <Link to={`/comics/${comic._id}`} className="card-title">{comic.title}</Link>
                        <span className="card-value"style={{ fontSize: '1.7em' } }>{comic.userValor} €</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-3">No has creado ningún cómic</p>
              )}
            </div>

            <hr />
            <h3>Cómics favoritos</h3>
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-md-3 g-4">
                {filteredFavoriteComics.length > 0 ? (
                  filteredFavoriteComics.map((comic) => (
                    <div className="col mb-4" key={comic._id}>
                      <div className="card h-100">
                        <img src={comic.coverImage} className="card-img-top" alt={comic.title} />
                        <div className="card-body d-flex flex-column">
                          <Link to={`/comics/${comic._id}`} style={{ color: 'gray', fontWeight: 'bold' }}>{comic.title}</Link>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <span className="card-value" style={{ fontSize: '1em' }}>{comic.userValor} €</span>
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
                                width: "30px",
                                height: "30px",
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
                  ))
                ) : (
                  <p className="mt-3">No tienes cómics favoritos</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
