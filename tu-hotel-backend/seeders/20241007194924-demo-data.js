// seeders/XXXXXXXXXX-demo-data.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Poblar la tabla de Usuarios
    await queryInterface.bulkInsert('Users', [
      {
        email: 'user1@example.com',
        password: '$2a$10$uOE4I8dVWqgj7Jr.w5/83OK8ylZR1./lGvKHHE97HzX2j4vvvU1oO',  // bcrypt hash de 'password123'
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'admin@example.com',
        password: '$2a$10$uOE4I8dVWqgj7Jr.w5/83OK8ylZR1./lGvKHHE97HzX2j4vvvU1oO',  // bcrypt hash de 'admin123'
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Poblar la tabla de Hoteles
    await queryInterface.bulkInsert('Hotels', [
      {
        name: 'Hotel Central',
        address: 'Calle 123, Ciudad',
        rating: 4,
        pricePerNight: 100.00,
        amenities: 'WiFi, Piscina, Spa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hotel Playa',
        address: 'Avenida de la Playa, Ciudad',
        rating: 5,
        pricePerNight: 150.00,
        amenities: 'WiFi, Piscina, Gimnasio',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    // Poblar la tabla de Reservas
    await queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,  // El ID del usuario (user1)
        hotelId: 1,  // El ID del hotel (Hotel Central)
        checkIn: '2024-10-01',
        checkOut: '2024-10-05',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,  // El ID del usuario (user1)
        hotelId: 2,  // El ID del hotel (Hotel Playa)
        checkIn: '2024-11-01',
        checkOut: '2024-11-07',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina los datos insertados si se ejecuta la reversión
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Hotels', null, {});
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
