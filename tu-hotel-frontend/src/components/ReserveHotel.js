import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ReserveHotel = () => {
  const { id } = useParams();  // Obtener el ID del hotel desde la URL
  const navigate = useNavigate();
  
  const [hotel, setHotel] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchHotelDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotel(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del hotel:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const handleReserve = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    try {      
      await axios.post('http://localhost:5000/api/bookings/create', {
        hotelId: id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Reserva realizada con éxito');
      navigate('/reservations');  // Redirigir a la página de reservas
    } catch (error) {
      setError('Error al realizar la reserva');
      console.error("Error al realizar la reserva:", error);
    }
  };

  if (!hotel) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Reservar en {hotel.name}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleReserve}>
        <div>
          <label>Fecha de entrada:</label>
          <input 
            type="date" 
            value={checkInDate} 
            onChange={(e) => setCheckInDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Fecha de salida:</label>
          <input 
            type="date" 
            value={checkOutDate} 
            onChange={(e) => setCheckOutDate(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
};

export default ReserveHotel;
