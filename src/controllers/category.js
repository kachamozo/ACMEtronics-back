const { Op } = require("sequelize");
const { Category } = require("../connection/db");

const getAll = async (req, res, next) => {
  const { name } = req.query;
  try {
    let where = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    const { count, rows } = await Category.findAndCountAll({ where });

    if (!rows.length > 0)
      return res.status(404).json({ msg: "Categoria no encontrada" });
    res.status(200).json({ count: count, categories: rows });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ msg: "Id no provisto" });
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ msg: "Categoria no encontrada" });
    res.status(200).json({ msg: "Categoria encontrada", category });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const name = req.body.name;
  try {
    if (!name)
      return res.status(400).json({ msg: "Nombre de categoria no provisto" });
    const category = await Category.findOne({ where: { name } });
    if (category) {
      return res
        .status(200)
        .json({ msg: "La categoria ya existe en la base de datos" });
    }
    const newCategory = await Category.create({ name });
    res.status(201).json({ msg: "Categoria creada", category: newCategory });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!id) return res.status(400).json({ msg: "Id no provisto" });
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ msg: "Categoria no encontrada" });
    const updatedCategory = await category.update({
      name: name || category.name,
    });
    if (!updatedCategory)
      return res
        .status(200)
        .json({ msg: "No se pudo actualizar la categoria" });
    res
      .status(201)
      .json({ msg: "Categoria actualizada", category: updatedCategory });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json({ msg: "Id no provisto" });
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ msg: "Categoria no encotrada" });
    const deleteCategory = await category.destroy();
    if (!deleteCategory)
      return res.status(200).json({ msg: "No se pudo eliminar categoria" });
    res.status(201).json({ msg: "Categoria eliminada", category });
  } catch (error) {
    next(error);
  }
};

const createBulk = async (req, res, next) => {
  const { categories } = req.body;
  try {
    if (!categories.length > 0)
      return res.status(400).json({ msg: "Lista de categorias no provistas" });

    const { count, rows } = await Category.findAndCountAll();
    if (count > 0)
      return res.status(200).json({ count: count, categories: rows });

    const newCategories = await Category.bulkCreate(categories);
    if (!newCategories.length > 0)
      return res
        .status(200)
        .json({ msg: "No se pudo crear la lista de categorias" });
    res
      .status(201)
      .json({ msg: "Lista de categorias creadas", categories: newCategories });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, deleteById, createBulk };
