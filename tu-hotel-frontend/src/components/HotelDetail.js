import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/hotels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotel(response.data);
    };

    fetchHotel();
  }, [id]);

  if (!hotel) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>Dirección: {hotel.address}</p>
      <p>Precio por noche: {hotel.pricePerNight}</p>
      <p>Amenidades: {hotel.amenities}</p>
    </div>
  );
};

export default HotelDetail;
