const express = require('express');
const { Hotel } = require('../models');  // Se importa el modelo del Hotel
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');  // Middleware para autenticación
const router = express.Router();

// Ruta para listar todos los hoteles
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (error) {
    console.error('Error al obtener los hoteles:', error);
    res.status(500).json({ error: 'Error al obtener los hoteles' });
  }
});

// Ruta para obtener un hotel por su ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel no encontrado' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error al obtener el hotel:', error);
    res.status(500).json({ error: 'Error al obtener el hotel' });
  }
});

// Ruta para crear un nuevo hotel (solo admin)
router.post('/create', authenticateToken, authorizeAdmin, async (req, res) => {
  const { name, address, rating, pricePerNight, amenities } = req.body;
  try {
    const hotel = await Hotel.create({
      name,
      address,
      rating,
      pricePerNight,
      amenities
    });
    res.status(201).json({ message: 'Hotel creado con éxito', hotel });
  } catch (error) {
    console.error('Error al crear el hotel:', error);
    res.status(500).json({ error: 'Error al crear el hotel' });
  }
});

// Ruta para actualizar un hotel (solo admin)
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  const { name, address, rating, pricePerNight, amenities } = req.body;
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel no encontrado' });
    }
    hotel.name = name;
    hotel.address = address;
    hotel.rating = rating;
    hotel.pricePerNight = pricePerNight;
    hotel.amenities = amenities;
    await hotel.save();
    res.json({ message: 'Hotel actualizado con éxito', hotel });
  } catch (error) {
    console.error('Error al actualizar el hotel:', error);
    res.status(500).json({ error: 'Error al actualizar el hotel' });
  }
});

// Ruta para eliminar un hotel (solo admin)
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel no encontrado' });
    }
    await hotel.destroy();
    res.json({ message: 'Hotel eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el hotel:', error);
    res.status(500).json({ error: 'Error al eliminar el hotel' });
  }
});

module.exports = router;
