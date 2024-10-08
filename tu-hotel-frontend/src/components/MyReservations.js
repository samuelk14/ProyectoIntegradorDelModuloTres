import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');  

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem('token');
      try{
      const response = await axios.get('http://localhost:5000/api/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(response.data);
      } catch (error) {
        setError('Error al obtener las reservas');
        console.error("Error al obtener reservas:", error);
      }
    };

    fetchReservations();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>; // Mostrar error si lo hay
  }

  if (reservations.length === 0) {
    return <p>No tienes reservas.</p>; // Mensaje si no hay reservas
  }

  return (
    <div>
      <h1>Mis Reservas</h1>
      <ul>
        {reservations.map((res) => (
          <li key={res.id}>
          <p>Hotel ID: {res.hotelId}</p>
          <p>Fecha de entrada: {new Date(res.checkIn).toLocaleDateString()}</p>
          <p>Fecha de salida: {new Date(res.checkOut).toLocaleDateString()}</p>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReservations;
