import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Register from './pages/Register';
//import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Home from './pages/Home/Home';
import ComicDetails from './pages/ComicsDetails/ComicsDetails';
import ComicForm from './pages/ComicForm/ComicForm';
import UnprotectedRoute from './components/UnprotectedRoute';
import StartPage from './pages/StartPage/StartPage';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Favorites from './pages/Favorites/Favorites';
import Offer from './pages/offerForm/offerForm'
import OffersPage from './pages/OffersPage/OfferPage';
import OfferDetails from './pages/OfferDetails/OfferDetails';



function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="container app-container">
        <Routes>
          <Route path="/" element={<UnprotectedRoute><StartPage /></UnprotectedRoute>} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<StartPage />} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/comics/add" element={<ComicForm />} />
          <Route path="/comics/edit/:id" element={<ComicForm />} />
          <Route path="/comics/:id" element={<ComicDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/offers/:id" element={<OfferDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>


    {user && <Navbar />} 
    </>
  );
}

export default App;