import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import homeIcon from '../assets/icons/home.png';
import addIcon from '../assets/icons/add.png';
import messagesIcon from '../assets/icons/messages.png';
import profileIcon from '../assets/icons/profile.png';
import favoritesIcon from '../assets/icons/favorites.png';


function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning fixed-bottom">
   {user &&   <div className="container-fluid d-flex justify-content-around">
        <Link className="navbar-brand" to="/">
          <img src={homeIcon} alt="Home" width="40" height="40" />
        </Link>
        <Link className="navbar-brand" to="/offers">
          <img src={messagesIcon} alt="ofertas" width="40" height="40" />
        </Link>
        <Link className="navbar-brand" to="/comics/add">
          <img src={addIcon} alt="Añadir Comic" width="40" height="40" />
        </Link>
        
        <Link className="navbar-brand" to="/favorites">
          <img src={favoritesIcon} alt="Favoritos" width="40" height="40" />
        </Link>
        <Link className="navbar-brand" to="/profile">
          <img src={profileIcon} alt="Perfil" width="40" height="40" />
        </Link>
       
      </div>}
    </nav>
  );
}


export default Navbar;