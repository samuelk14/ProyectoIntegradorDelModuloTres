'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      // Un hotel tiene muchas reservas
      Hotel.hasMany(models.Booking, { foreignKey: 'hotelId' });
    }
  }
  Hotel.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 }
    },
    pricePerNight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    amenities: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};
