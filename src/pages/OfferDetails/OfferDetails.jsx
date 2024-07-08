import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate,  } from "react-router-dom";
import { deleteOffer, getOfferById, updateOfferStatus } from "../../services/comicService";
import { AuthContext } from "../../contexts/AuthContext";


function OfferDetails() {
  const { id } = useParams();
  const navigate= useNavigate();

  const { user } = useContext(AuthContext);
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOfferById(id)
      .then((offer) => setOffer(offer))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeleteBtnClick = () => {
    deleteOffer(id)
      .then(() => {
        navigate('/offers');
      })
      .catch((e) => console.log(e));
  };

  const handleUpdateStatus = async (offerId, newStatus) => {
    try {
      await updateOfferStatus(offerId, newStatus.toLowerCase());
      setOffer({ ...offer, status: newStatus });
    } catch (error) {
      console.error("Error updating offer status:", error);
    }
  };

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (!offer) {
    return <div>Oferta no encontrada</div>;
  }

  const isOwner = user && user._id === offer.comicOwner._id;

  return (
    <div className="offer-details">
      <h1>Detalles de la Oferta</h1>
      <div className="offer-comic">
        <h2>Cómic Ofertado</h2>
        <img src={offer.comic.coverImage} className="img-thumbnail" width={200} alt={offer.comic.title} />
        <h4><Link to={`/comics/${offer.comic._id}`} style={{ color: 'gray', fontWeight: 'bold' }}>{offer.comic.title}</Link></h4>
      
        <p>Valor: {offer.comic.userValor} €</p>
        <Link to={`/comics/${offer.comic._id}`} className="btn btn-primary">Ver detalles del cómic</Link>
      </div>

      <div className="offered-comics">
        <h2>Cómics Ofrecidos a Cambio</h2>
        {offer.offeredComics.map((offeredComic) => (
          <div key={offeredComic._id} className="offered-comic">
            <img src={offeredComic.coverImage} className="img-thumbnail" width={200} alt={offeredComic.title} />
            <h4><Link to={`/comics/${offeredComic._id}`} style={{ color: 'gray', fontWeight: 'bold' }}>{offeredComic.title}</Link></h4>
           
            <p>Valor: {offeredComic.userValor} €</p>
            <Link to={`/comics/${offeredComic._id}`} className="btn btn-primary">Ver detalles del cómic</Link>
          </div>
        ))}
      </div>

      <div className="offer-status">
        <h2>Estado de la Oferta: {offer.status}</h2>
        {isOwner && (
          <div className="d-flex justify-content-center">
            <button
              className={`btn me-2 ${offer.status === 'Rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={handleDeleteBtnClick}
              disabled={offer.status === 'Rejected'}
            >
              Rechazar
            </button>
            <button
              className={`btn ${offer.status === 'Accepted' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => handleUpdateStatus(offer._id, 'Accepted')}
              disabled={offer.status === 'Accepted'}
            >
              Aceptar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfferDetails;
