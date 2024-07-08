import { useEffect, useState, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { addComic, editComic, getComic } from "../../services/comicService";
import { useNavigate, useParams } from "react-router-dom";
import { conditions } from "../../constants/conditions";
import { AuthContext } from "../../contexts/AuthContext";  

function ComicForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);  
    const userId = user ? user._id : null;  
    const [Comic, setComic] = useState({
        title: "",
        publisher: "",
        condition: [],
        description: "",
        userValor: 0,
        marketValor: 0,
        coverImage: "",
        owner: userId,
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (id) {
            getComic(id)
                .then((comic) => {
                    setComic(comic);
                })
                .catch((e) => console.log(e));
        }
    }, [id]);

    useEffect(() => {
        if (userId) {
            setComic(prevComic => ({
                ...prevComic,
                owner: userId
            }));
        }
    }, [userId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setComic({
            ...Comic,
            [name]: value
        });
    };

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let key in Comic) {
            formData.append(key, Comic[key]);
        }

        if (imageFile) {
            formData.append('coverImage', imageFile);
        }
        const newComic = { ...Comic }
        if (id) {
            editComic(id, newComic)
                .then((editedComic) => {
                    navigate(`/Comics/${editedComic._id}`);
                })
                .catch(err => console.error(err));

            return;
        }

        addComic(formData)
            .then(() => {
                navigate('/');
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <h1 className="mb-5">{id ? 'Editar oferta' : 'Crea una oferta'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titulo</label>
                    <input type="text" className="form-control" name="title" id="title" value={Comic.title} onChange={handleInputChange} required placeholder="Añade un titulo..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label">Editorial</label>
                    <input type="text" className="form-control" name="publisher" id="publisher" value={Comic.publisher} onChange={handleInputChange} required placeholder="Añade una editorial..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="condition" className="form-label">Condiciones</label>
                    <select className="form-select" name="condition" id="condition" value={Comic.condition} onChange={handleInputChange} required>
                        <option value="">Selecciona una condición...</option>
                        {conditions.map((condition, index) => (
                            <option key={index} value={condition}>{condition}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripcion</label>
                    <input type="text" className="form-control" name="description" id="description" value={Comic.description} onChange={handleInputChange} placeholder="Añade una descripcion..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="userValor" className="form-label">Valor</label>
                    <input type="number" min={0} className="form-control" name="userValor" id="userValor" value={Comic.userValor} onChange={handleInputChange} required placeholder="Añade un valor..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="marketValor" className="form-label">Valor de mercado</label>
                    <input type="number" min={0} className="form-control" name="marketValor" id="marketValor" value={Comic.marketValor} onChange={handleInputChange} required placeholder="Añade un valor..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="coverImage" className="form-label">Imagen de portada</label>
                    <input type="file" className="form-control" name="coverImage" id="coverImage" onChange={handleImageChange} />
                    <div id="imageHelp" className="form-text">Selecciona una imagen para subir.</div>
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Edit Comic' : 'Add Comic'}</button>
            </form>
        </>
    );
}

export default ComicForm;