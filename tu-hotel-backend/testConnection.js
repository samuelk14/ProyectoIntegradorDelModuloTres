// testConnection.js
const { Sequelize } = require('sequelize');

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize('tu_hotel', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa con MySQL.');
  } catch (error) {
    console.error('No se pudo conectar con la base de datos:', error);
  }
}

testConnection();
