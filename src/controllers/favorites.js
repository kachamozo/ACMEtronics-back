const { User, Product } = require("../connection/db");

const getFavorites = async (req, res) => {
  const { userEmail } = req.query
  const favorites = await User.findOne({
    where: { email: userEmail },
    include: {
      model: Product,
      as: "Favorites",
      attributes: ["id", "name", "price", "image"],
      through: { attributes: [] },
    },
  });
  res.send(favorites)
}

const addFavorite = async (req, res) => {
  const { userEmail, productId } = req.query;

  try {
    const user = await User.findOne({
    where: { email: userEmail },
    include: {
      model: Product,
      as: "Favorites",
      attributes: ["id", "name", "price", "image"],
      through: { attributes: [] },
    },
  });

  const product = await Product.findOne({ where: { id: productId } });
  await user.addFavorites(product);

  return res.status(200).send('Product added successfully');
  } catch (error) {
    return res.status(400).send('Oops! the product could not be added to your favorites. Please try again')
  }
};

const removeFavorite = async (req, res) => {
  const { userEmail, productId  } = req.query;

  try {
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
      include: {
        model: Product,
        as: "Favorites",
        attributes: ["id", "name", "price", "image"],
        through: {
          attributes: [],
        },
      },
    });
    const product = await Product.findOne({ where: { id: productId } });
    await user.removeFavorites(product);
   return res.status(200).send('Product deleted successfully');
  
  } catch (error) {
    return res.status(400).send('Oops! the product could not be deleted. Please try again');
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};