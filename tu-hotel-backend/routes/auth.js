const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');  // se importa el modelo del Usuario
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    //console log
    // console.log('Contraseña original:', password);

    // Crear el usuario
    // const hashedPassword = await bcrypt.hash(password, 10);

    // // Incluir un console.log para ver la contraseña encriptada
    // console.log('Contraseña encriptada:', hashedPassword);

    const user = await User.create({
      email,
      password, // Se guarda la contraseña encriptada
    });

    // Incluir un console.log para ver la contraseña encriptada
    // console.log('Contraseña encriptada2:', hashedPassword);

    res.status(201).json({ message: 'Usuario registrado con éxito', user });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Incluir un console.log para verificar la contraseña proporcionada y la contraseña almacenada
    // console.log('Contraseña proporcionada:', password);
    // console.log('Contraseña almacenada (hash):', user.password);

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    // Incluir un console.log para verificar si las contraseñas coinciden
    // console.log('¿Contraseñas coinciden?:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Crear y devolver el token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
