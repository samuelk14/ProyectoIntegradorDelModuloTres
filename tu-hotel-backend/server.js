require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');         // Rutas de autenticación
const hotelRoutes = require('./routes/hotels');      // Rutas de hoteles
const bookingRoutes = require('./routes/bookings');  // Rutas de reservas

app.use(cors());
app.use(express.json());  // Para interpretar el cuerpo de las solicitudes JSON

// Rutas


app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
