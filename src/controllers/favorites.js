const { User, Product } = require("../connection/db");

// const addFavorite = async (req, res) => {
//   const { userId, productId } = req.body;

//   let user = await User.findOne({
//     where: { id: userId },
//   });

//   let product = await Product.findOne({
//     where: { id: productId },
//   });

//   await user.addFavorites(product);

//   user = await User.findOne({
//     where: {
//       id: userId,
//     },
//     include: {
//       model: Product,
//       as: "favorites",
//       attributes: ["id", "name", "price", "image"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
//   res.send(user);
// };

const addFavorite = async (req, res) => {
  const { userId, productId } = req.body;

  const user = await User.findOne({
    where: { id: userId },
    include: {
      model: Product,
      as: "favorites",
      attributes: ["id", "name", "price", "image"],
      through: { attributes: [] },
    },
  });

  const product = await Product.findOne({ where: { id: productId } });
  await user.addFavorites(product);

  return res.send(user);
};

const removeFavorite = async (req, res) => {
  const { id, productId } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id: productId,
      },
      include: {
        model: Product,
        as: "favorites",
        attributes: ["id", "name", "price", "image"],
        through: {
          attributes: [],
        },
      },
    });

    const removeFavorite = user.favorites.filter((p) => p.id === parseInt(id));
    // const removeProduct = user.favorites.map(p=> p.id !== id)
    const newList = user.favorites.filter((p) => p.id !== id);

    await user.removeFavorites(removeFavorite);

    return res.send(newList);
  } catch (error) {
    return res.send("The Product could not be removed from the wishlist.");
  }
};

// const removeFavorite = async (req, res) => {
//     const { id, productId } = req.params;

//     try {
//       const user = await User.findOne({
//         where: {
//              id: productId },
//         include: {
//           model: Product,
//           as: "favorites",
//           attributes: ["id", "name", "price", "image"],
//           through: { attributes: [] },
//         },
//       });

//       await user.removeFavorites(productId);
//       const newList = user.favorites.filter((p) => p.id !== productId);

//       return res.send(newList);
//     } catch (error) {
//       return res.send("The Product could not be removed from the wishlist.");
//     }
//   };

module.exports = {
  addFavorite,
  removeFavorite,
};
