const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      firstname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      banned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
      },
    },
    {
      timestamps: true,
    }
  );
};
