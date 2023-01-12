const Router = require("express");
const { Order, Gmailuser } = require("../connection/db");

const postOrder = async (req, res, next) => {
  const {status, total, items, email} = req.body
  if ((!email || !status))
  return res.status(400).json({ message: "incomplete order" });
  try {
  const newOrder = await Order.create({status, total, items})
  const gmailuser = await Gmailuser.findAll({
    where : {
      email: email
    }
  })
  const orderAdded = await newOrder.addGmailuserOrder(gmailuser)
  
  return res.status(200).send(orderAdded)
  } catch (error) {
    next(error)  
  }
  
};

//trae todas las ordenes de todos los usuarios
const getOrder = async (req, res, next) => {
  const allorders = await Order.findAll({
    include: {
      model: Gmailuser,
      as: "GmailuserOrder",
      attributes: ["email",],
      through: { attributes: [] },

    }
  })
  if (allorders === null) return res.status(404).json({ message: "No hay ordenes" });
  return res.send(allorders)
};

//??Get order by orderId

const getOrderId = async(req, res, next) => {
  const { id } = req.params;

  await Order.findAll({
    attributes: ["id", "status", "total", "items"],
    where: {
      id: id,
    },
    include: {
      attributes: ["email"],
      model: Gmailuser,
      as: "GmailuserOrder",
      through: {
        attributes: [],
      },
    },
  })
    .then((order) => res.json(order))
    .catch((error) => next(error.message));
};

const getOrderByUser = async(req, res, next) => {
  const { email } = req.params;

  await Order.findAll({
    attributes: ["id", "status", "total", "items"],
    where: {
      email: email,
    },
    include: {
      attributes: ["email"],
      model: Gmailuser,
      as: "GmailuserOrder",
      through: {
        attributes: [],
      },
    },
  })
    .then((order) => res.json(order))
    .catch((error) => next(error.message));
};

//Actualiza orden por id
const putOrder = async (req, res, next) => {
  let { id } = req.params;
  let currentOrder = req.body;

  await Order.findOne({
    where: { id },
    include: {
      attributes: ["email"],
      model: Gmailuser,
      as: "GmailuserOrder",
      through: {
        attributes: [],
      },
    },
  })
    .then((order) => {
      if (!order)
        return res.status(404).json({ message: "Esa orden no existe" });

      order.update(currentOrder).then((orderUpdate) => {
        return res.status(200).json({ orderUpdate });
      });
    })
    .catch(next);
};

const deleteOrder = async (req, res, next) => {
  let { id } = req.params;

  await Order.findOne({ where: { id } })
    .then((order) => {
      if (!order)
        return res.status(404).json({ message: "Esa orden no existe" });

      order.destroy(order).then(() => {
        return res.status(200).json({ message: "Order deleted" });
      });
    })
    .catch(next);
}; 

module.exports = {
    postOrder,
    getOrder, 
    getOrderId, 
    getOrderByUser,
    putOrder, 
    deleteOrder
}