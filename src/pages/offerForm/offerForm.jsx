import { useEffect, useState } from 'react';
import { getOwns, createOffer } from '../../services/comicService';
import { useParams, useNavigate } from 'react-router-dom';

function OfferForm() {
    const { id } = useParams(); // ID del cómic al que se le hace la oferta
    const [comics, setComics] = useState([]);
    const [selectedComics, setSelectedComics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOwns()
            .then(response => {
                setComics(response);
            })
            .catch(error => {
                console.error('Error fetching comics:', error);
            });
    }, []);

    const handleComicChange = (event) => {
        const options = event.target.options;
        const selected = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedComics(selected);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const offer = {
            comicId: id, // ID del cómic al que se le hace la oferta
            offeredComics: selectedComics // Cómics ofrecidos
        };

        createOffer(offer)
            .then(() => {
                navigate(`/comics/${id}`); 
            })
            .catch(error => {
                console.error('Error creating offer:', error);
            });
    };

    return (
        <div>
            <h1>Pagina de Ofertas</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="comics" className="form-label">Mis Cómics</label>
                    <select
                        multiple
                        className="form-control"
                        id="comics"
                        name="comics"
                        onChange={handleComicChange}
                    >
                        {comics.map(comic => (
                            <option key={comic._id} value={comic._id}>
                                {comic.title}   {comic.userValor} 
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Crear Oferta</button>
            </form>
        </div>
    );
}

export default OfferForm;