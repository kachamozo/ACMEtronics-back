const {
	DataTypes
} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('product', {
		id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
			allownull: false,
        },
		name: {
			type: DataTypes.STRING,
			allownull: false,
		},
		description: {
			type: DataTypes.STRING,
			allownull: false,
			varchar: 255,
			
		},
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
		rating: {
			type: DataTypes.INTEGER,
			allownull: false,
		},
		image: {
			type: DataTypes.STRING,
			allownull: false,
		},
	},{timestamps: false});
};