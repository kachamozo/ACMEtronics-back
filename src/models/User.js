const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'user',
		{
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			userName: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			email: {
				type: DataTypes.STRING,
				allowNull: false,

				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			name: DataTypes.STRING,
			lastName: DataTypes.STRING,
			age: DataTypes.INTEGER,
			country: DataTypes.STRING,
			city: DataTypes.STRING,
			phone: DataTypes.STRING,
			address: DataTypes.STRING,
		},
		{ timestamps: true, paranoid: true }
	);
};
