import './App.css';
import Footer from './sections/Footer';
import Main from './sections/Main';
import Nav from './sections/Nav';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import Order from './pages/Order';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
