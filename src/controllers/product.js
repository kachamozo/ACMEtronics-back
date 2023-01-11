const { Op } = require('sequelize');
const { Product, Category,Comment } = require('../connection/db');

const getAll = async (req, res, next) => {
	const { name } = req.query;
	try {
		let where = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

		const { count, rows } = await Product.findAndCountAll({
			where,
			include: [
				{
					model:Category,
					as: 'CategoryProduct',
					attributes: ['id', 'name'],
					through: { attributes: [] },
				},
				{
					model:Comment,
					attributes: ['text'],
					through: { attributes: [] },
				},
			],
		});

		if (!rows.length > 0)
			return res.status(404).json({ msg: 'Producto no encontrado' });
		res.status(200).json({ count: count, products: rows });
	} catch (error) {
		next(error);
	}
};

const getById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(400).json({ msg: 'Id no provisto' });
		const product = await Product.findByPk(id, {
			include: [
				{
					model: Category,
					as: 'CategoryProduct',
					attributes: ['id', 'name'],
					through: { attributes: [] },
				},
				{
					model:Comment,
					attributes: ['text'],
					through: { attributes: [] },
				},
			],
		});
		if (!product)
			return res.status(404).json({ msg: 'Producto no encontrado' });
		res.status(200).json({ msg: 'Producto encontrado', product });
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	const { name, brand, price, stock, image, description, rating, categories } =
		req.body;
	try {
		if (!name)
			return res.status(400).json({ msg: 'Name de producto no provisto' });
		if (!brand)
			return res.status(400).json({ msg: 'Brand de producto no provisto' });
		if (!price)
			return res.status(400).json({ msg: 'Price de producto no provisto' });
		if (!stock)
			return res.status(400).json({ msg: 'Stock de producto no provisto' });
		if (!image)
			return res.status(400).json({ msg: 'Image de producto no provisto' });
		if (!categories.length > 0)
			return res
				.status(400)
				.json({ msg: 'Categories de producto no provisto' });

		const [product, created] = await Product.findOrCreate({
			where: {
				name: name,
				brand: brand,
				price: price,
				stock: stock,
				image: image,
			},
			defaults: {
				description,
				rating,
			},
		});

		if (!created)
			return res.status(200).json({ msg: 'Producto ya existente ', product });

		product.addCategoryProduct(categories);
		res.status(201).json({ msg: 'Producto creado', product });
	} catch (error) {
		next(error);
	}
};

const getStock = (stock,quantity,productStock) => {
	if(stock)return stock
	if(quantity) return productStock - quantity
	return productStock
}

const update = async (req, res, next) => {
	const { id } = req.params;
	const { name, brand, price, stock, image, description, quantity, comments } = req.body;

	try {
		if (!id) return res.status(400).json({ msg: 'Id no provisto' });
		const product = await Product.findByPk(id);
		if (!product)
			return res.status(404).json({ msg: 'Producto no encontrado' });

		const updateProduct = await product.update({
			name: name || product.name,
			brand: brand || product.brand,
			price: price || product.price,
			stock: getStock(stock,quantity,product.stock),
			image: image || product.image,
			description: description || product.description,
			comments: comments || product.comments
		});

		if (!updateProduct)
			return res.status(200).json({ msg: 'No se pudo actualizar el producto' });

		// Si existe un array de categorias en el json body entonces borramos las categorias

		// agregamos las nuevas categorias

		res
			.status(201)
			.json({ msg: 'Producto actualizado', product: updateProduct });
	} catch (error) {
		next(error);
	}
};

const deleteById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(400).json({ msg: 'Id no provisto' });
		const product = await Product.findByPk(id);

		if (!product)
			return res.status(404).json({ msg: 'Producto no encontrado' });
		const deleteProduct = await product.destroy();
		if (!deleteProduct)
			return res.status(200).json({ msg: 'No se pudo eliminar el producto' });

		// Codigo para borrar la relacion de la tabla intermedia
		// const findCategories = await product.getCategoryProduct({
		// 	joinTableAttributes: [],
		// });
		// product.removeCategoryProduct(findCategories);

		res.status(201).json({ msg: 'Producto eliminado', product });
	} catch (error) {
		next(error);
	}
};

const createBulk = async (req, res, next) => {
	const { products, categories } = req.body;

	try {
		if (!products)
			return res.status(400).json({ msg: 'Productos no provistos' });
		if (!categories)
			return res.status(400).json({ msg: 'Categorias no provistas' });

		const { count, rows } = await Product.findAndCountAll();
		if (count > 0)
			return res.status(200).json({ count: count, products: rows });

		const newProduct = await Product.bulkCreate(products, {
			include: ['CategoryProduct'],
		});

		const newCategories = await Category.bulkCreate(categories);

		if (newProduct.length === 0 || newCategories.length === 0)
			return res.status(200).json({
				msg: 'No se pudo crear los productos, categorias',
			});

		newProduct.forEach((product) => {
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
			msg: 'Lista de productos y categorias creadas',
			products: newProduct,
			categories: newCategories,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	deleteById,
	createBulk,
};
