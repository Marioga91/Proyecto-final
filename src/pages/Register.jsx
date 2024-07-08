import { useContext, useState } from "react";
import { createUser } from "../services/UserService";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { user: currentUser, isAuthLoaded } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
    avatar: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    phoneNumber: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let key in user) {
      formData.append(key, user[key]);
    }

    if (imageFile) {
      formData.append('avatar', imageFile);
    }

    createUser(formData)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!isAuthLoaded) {
    return <p>Loading...</p>;
  }

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1 className="mb-3">Registrate</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Nombre completo</label>
          <input onChange={handleInputChange} value={user.fullName} type="text" className="form-control" name="fullName" id="fullName" required placeholder="Add your full name..." />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input onChange={handleInputChange} value={user.email} type="email" className="form-control" name="email" id="email" required placeholder="Add your email..." />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input onChange={handleInputChange} value={user.password} type="password" className="form-control" name="password" id="password" required placeholder="Add a password..." />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input onChange={handleInputChange} value={user.address} type="text" className="form-control" name="address" id="address" required placeholder="Add your address..." />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">Ciudad</label>
          <input onChange={handleInputChange} value={user.city} type="text" className="form-control" name="city" id="city" required placeholder="Add your city..." />
        </div>

        <div className="mb-3">
          <label htmlFor="postalCode" className="form-label">Código postal</label>
          <input onChange={handleInputChange} value={user.postalCode} type="text" className="form-control" name="postalCode" id="postalCode" required placeholder="Add your postal code..." />
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">País</label>
          <input onChange={handleInputChange} value={user.country} type="text" className="form-control" name="country" id="country" required placeholder="Add your country..." />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Número de teléfono</label>
          <input onChange={handleInputChange} value={user.phoneNumber} type="text" className="form-control" name="phoneNumber" id="phoneNumber" required placeholder="Add your phone number..." />
        </div>

        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">Avatar</label>
          <input type="file" className="form-control" name="avatar" id="avatar" onChange={handleImageChange} />
          <div id="imageHelp" className="form-text">Selecciona una imagen para subir.</div>
        </div>          
  
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Register;