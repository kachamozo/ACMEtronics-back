const { Router } = require("express");
const { Product } = require("../connection/db");
const router = Router();
router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    if (id) {
      await Product.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ success: "Products succesfully deleted!" });
    }
  } catch (error) {
    res.send(400).json({ error: error.message });
  }
});

const updateProduct = async (req,res) => {
  try {
    const { id } = req.params;
    const {name,description,brand,os,price,stock,rating,category,image,} = req.body
   const putProduct =  await Product.update({
      name,
      description,
      brand,
      os,
      price,
      stock,
      rating,
      category,
      image,
      
    },
    {where: { id: id }},);

    return res.status(200).send("updated products");
  } catch (error) {
    console.log(error)
    return res.status(404).send(error.message);
  }
}

module.exports = { updateProduct}