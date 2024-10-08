const express = require('express');
const { Booking, Hotel } = require('../models');  // Se importan los modelos necesarios
const { authenticateToken } = require('../middlewares/auth');  // Middleware para autenticación
const router = express.Router();

// Ruta para crear una reserva
router.post('/create', authenticateToken, async (req, res) => {
  const { hotelId, checkIn, checkOut } = req.body;
  try {
    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel no encontrado' });
    }
    
    // Crear la reserva
    const booking = await Booking.create({
      userId: req.user.id,  // ID del usuario autenticado
      hotelId,
      checkIn,
      checkOut
    });
    res.status(201).json({ message: 'Reserva creada con éxito', booking });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
});

// Ruta para obtener todas las reservas del usuario autenticado
router.get('/my-bookings', async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { userId: req.user.id }, include: Hotel });
    res.json(bookings);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
});

module.exports = router;
