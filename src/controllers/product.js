const { Op } = require('sequelize');
const { Product, Category } = require('../connection/db');

const createBulk = async (req, res, next) => {
	const { products, categories } = req.body;

	try {
		if (!products)
			return res.status(400).json({ msg: 'Productos no provistos' });
		if (!categories)
			return res.status(400).json({ msg: 'Categorias no provistas' });

		const newPoducts = await Product.bulkCreate(products, {
			include: ['CategoryProduct'],
		});
		const newCategories = await Category.bulkCreate(categories);

		if (newPoducts.length === 0 || newCategories.length === 0)
			return res.status(200).json({
				msg: 'No se pudo crear los productos, categorias',
			});

		newPoducts.forEach((product) => {
			products.forEach((dataProduct) => {
				if (product.name === dataProduct.name) {
					dataProduct.categories.forEach((categories) => {
						product.addCategoryProduct(categories);
					});

					//En caso de que solo tenga una unica categoria Ej: ojo tenemos que modifiacr el json de productos que las categories: 5 (integer)
					// product.addCategoryProduct(dataProduct.categories);
				}
			});
		});

		res.status(201).json({
			products: newPoducts,
			categories: newCategories,
		});
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	createBulk,
};
