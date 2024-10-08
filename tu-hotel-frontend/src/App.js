import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';  // Página de login
import Register from './components/Register';  // Página de registro
import HotelList from './components/HotelList';  // Lista de hoteles
import HotelDetail from './components/HotelDetail';  // Detalle de hotel por ID
import MyReservations from './components/MyReservations';  // Página de reservas
import ReserveHotel from './components/ReserveHotel';  // Importar el componente de reserva

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />  {/* Página de login */}
          <Route path="/register" element={<Register />} />  {/* Página de registro */}
          <Route path="/hotels" element={<HotelList />} />  {/* Lista de hoteles */}
          <Route path="/hotels/:id" element={<HotelDetail />} />  {/* Detalle de hotel por ID */}
          <Route path="/hotels/:id/reserve" element={<ReserveHotel />} />  {/* Ruta para reservar un hotel */}
          <Route path="/reservations" element={<MyReservations />} />  {/* Página de reservas */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
