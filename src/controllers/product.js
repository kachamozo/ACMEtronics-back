//lo q  sea
const { Op } = require("sequelize");
const { Product } = require("../connection/db");
const api = require("../data/products.json");

const saveProduct = async () => {
  try {
    api.products.forEach(async (e) => {
      await Product.findOrCreate({
        where: {
          id: e.id,
          name: e.title,
          brand: e.brand,
          price: e.price,
          stock: e.stock,
          rating: e.rating,
          image:e.image,
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const nameProduct = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      console.log(nameProduct);
      res.send(nameProduct);
    } else {
      const nameProduct = await Product.findAll();
      console.log(nameProduct);
      res.send(nameProduct);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveProduct,
  getProduct,
};
