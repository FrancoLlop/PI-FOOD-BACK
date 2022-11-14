const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.TEXT,
    },
    readyInMinutes: {
      type: DataTypes.INTEGER
    },
    dish:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    create:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },{timestamps: false});
};
