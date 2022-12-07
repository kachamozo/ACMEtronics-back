const { Router } = require("express");
const { Product } = require("../db");
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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Product.update({
      name,
      description,
      brand,
      OS,
      price,
      stock,
      rating,
      category,
      image,
      where: { id: id },
    });

    return res.status(200).send("updated products");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
