import createHttp from "./BaseService";

const http = createHttp(true);

export const listComics = () => {
  return http.get("/comics");
};

export const getComic = (id) => {
  return http.get(`/comics/${id}`);
};

export const addComic = (comic) => {
  return http.post("/comics", comic);
};

export const editComic = (id, comic) => {
  return http.put(`/comics/${id}`, comic);
};

export const deleteComic = (id) => {
  return http.delete(`/comics/${id}`);
};

export const updateComicFavoriteStatus = (comicId, isFavorite) => {
  return http.post(`/comics/${comicId}/favorite`, { isFavorite });
};

export const getFavoritesComics = () => {
  return http.get("/comics/me");
};

export const getOwns = () => {
  return http.get(`/comics/owns`);
};

export const getFavoriteComicsByUser = (userId) => {
  return fetch(`/api/users/${userId}/favorites`).then((response) => {
    if (!response.ok) {
      throw new Error("Error fetching favorite comics");
    }
    return response.json();
  });
};

export const createOffer = (offer) => {
  return http.post("/offers", offer);
};

export const getReceivedOffers = () => {
  return http.get("/offers/received");
};

export const getSentOffers = () => {
  return http.get("/offers/sent");
};

export const updateOfferStatus = (offerId, newStatus) => {
  return http.put(`/offers/${offerId}/status`, { status: newStatus });
};

export const deleteOffer = (id) => {
  return http.delete(`/offers/${id}`);
};

export const getOfferById = (id) => {
  return http.get(`/offers/${id}`);
};

export const getOffersForComic = (comicId) => {
  return http.get(`/offers/${comicId}`);
};
