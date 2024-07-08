import { useEffect, useState, useContext } from "react";
import { deleteComic, getComic } from "../../services/comicService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import './ComicsDetails.css';

function ComicDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthLoaded } = useContext(AuthContext); // Obtén el usuario autenticado y el estado de carga del contexto
  const [comic, setComic] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComic(id)
      .then((comic) => {
        setComic(comic);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeleteBtnClick = () => {
    deleteComic(id)
      .then(() => {
        navigate('/');
      })
      .catch((e) => console.log(e));
  };

  if (loading || !isAuthLoaded) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const isOwner = user && user._id === comic.owner;

  return (
    <>
      <img src={comic.coverImage} className="img-thumbnail mb-5" width={400} alt={comic.coverImage}></img>
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{comic.title}</h5>
          <p className="card-text">Condiciones : {comic.condition}</p>
          <p className="card-text">Descripcion : {comic.description}</p>
          <p className="card-value">Valor : {comic.userValor} €</p>
          <p className="card-text">valor de mercado : {comic.marketValor}</p>
          {!isOwner && (<Link to={`/offer/${id}`} className="btn btn-success mx-2">Hacer oferta</Link>   )}
          {isOwner && (
            <>
              <Link to={`/comics/edit/${comic._id}`} className="btn btn-warning mx-2">Edit</Link>
              <button className="btn btn-danger mx-2" onClick={handleDeleteBtnClick}>Delete</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ComicDetails;
