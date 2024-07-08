import { useEffect, useState, useCallback } from 'react';
import { deleteOffer, getReceivedOffers, getSentOffers, updateOfferStatus, } from '../../services/comicService';
import { Link,  } from "react-router-dom";

function OffersPage() {
  const [receivedOffers, setReceivedOffers] = useState([]);
  const [sentOffers, setSentOffers] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchOffers = useCallback(async () => {
    try {
      const [received, sent] = await Promise.all([getReceivedOffers(), getSentOffers()]);
      setReceivedOffers(received);
      setSentOffers(sent);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {

    fetchOffers();
  }, [fetchOffers]);

   const handleDeleteBtnClick = (id) => {
    deleteOffer(id)
      .then(() => {
        fetchOffers()
      })
      .catch((e) => console.log(e))
  }


  const handleUpdateStatus = async (offerId, newStatus) => {
    try {
    
      await updateOfferStatus(offerId, newStatus.toLowerCase());
      
      
      const updatedReceivedOffers = receivedOffers.map(offer =>
        offer._id === offerId ? { ...offer, status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) } : offer
      );
      setReceivedOffers(updatedReceivedOffers);

      const updatedSentOffers = sentOffers.map(offer =>
        offer._id === offerId ? { ...offer, status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) } : offer
      );
      setSentOffers(updatedSentOffers);

    } catch (error) {
      console.error("Error updating offer status:", error);
    }
  };

  if (loading) {
    return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  }

  return (
    <div className="offers-page">
      <h1>Ofertas:</h1>
      <div className="offers-section">
        <h2>Ofertas recibidas</h2>
        {receivedOffers.length === 0 ? (
          <p>No tienes ninguna oferta.</p>
        ) : (
          receivedOffers.map((offer) => (
            <div className="col mb-3" key={offer._id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{offer.comic.title}</h5>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="card-value">{offer.comic.userValor} €</span>
                    <div className="d-flex flex-column align-items-center">
                     
                      <Link to={`/offers/${offer._id}`} className="btn btn-primary">Ver detalles</Link>
                    </div>
                  </div>
                  <p className="mt-3">Estado: {offer.status}</p>
                  <div className="d-flex justify-content-center">
                    <button
                      className={`btn me-2 ${offer.status === 'Rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => handleDeleteBtnClick(offer._id, 'Rejected')}
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
                </div>
              </div>
            </div>
          ))
        )}

        <h2>Tus ofertas</h2>
        {sentOffers.length === 0 ? (
          <p>No tienes ninguna oferta</p>
        ) : (
          sentOffers.map((offer) => (
            <div className="col mb-3" key={offer._id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{offer.comic.title}</h5>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="card-value">{offer.comic.userValor} €</span>
                    <div className="d-flex flex-column align-items-center">
                     
                      <Link to={`/offers/${offer._id}`} className="btn btn-primary">Ver detalles</Link>
                    </div>
                  </div>
                  <p className="mt-3">Estado: {offer.status}</p>
         
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OffersPage;
