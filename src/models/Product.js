const { DataTypes, ARRAY } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      name: {
        type: DataTypes.STRING,
        allownull: false,
      },
      description: DataTypes.STRING(2000),
      brand: {
        type: DataTypes.STRING,
        allownull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allownull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allownull: false,
      },
      rating: DataTypes.FLOAT,
      image: {
        type: DataTypes.TEXT,
        allownull: false,
      },      
    },
    { timestamps: true, paranoid: true }
  );
};
