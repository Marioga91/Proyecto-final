import { useContext, useState } from "react";
import { loginService } from "../../services/UserService";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import './StartPage.css';

const StartPage = () => {
  const { login, user: currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    loginService(user)
      .then(token => {
        login(token)
      })
      .catch(err => {
        console.log(err)
        setError(err);
      })
  }


  if (currentUser) {
    return <Navigate to="/profile" />;
  }


  return (
    <div>
      <div>
        <h1>Bienvenido a Comic Trader</h1>
      </div>
      <h2>Iniciar Sesion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input name="email" onChange={handleInputChange} value={user.email} type="email" className="form-control" id="email" required placeholder="Add a email..." />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input name="password" onChange={handleInputChange} value={user.password} type="password" className="form-control" id="password" required placeholder="Add a password..." />
        </div>
        {error && <p className="text-danger">
          {error.message}
        </p>}
        <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
      </form>
    <div>
        <h2>O pulsa aqui para <Link to="/register" className="">REGISTRARTE</Link></h2>
    </div>
    
    </div>
  );


};

export  default StartPage;