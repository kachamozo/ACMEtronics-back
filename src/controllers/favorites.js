const { User, Product } = require("../connection/db");

const getFavorites = async (req, res) => {
  const { userId } = req.query
  const favorites = await User.findOne({
    where: { id: userId },
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
  const { userId, productId } = req.body;

  const user = await User.findOne({
    where: { id: userId },
    include: {
      model: Product,
      as: "Favorites",
      attributes: ["id", "name", "price", "image"],
      through: { attributes: [] },
    },
  });

  const product = await Product.findOne({ where: { id: productId } });
  await user.addFavorites(product);

  return res.send(user);
};

const removeFavorite = async (req, res) => {
  const { userId, productId  } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
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
    console.log(productId)
   return res.send('Product deleted succesfully');
  
  } catch (error) {
    return res.send("The Product could not be removed from the wishlist.");
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
