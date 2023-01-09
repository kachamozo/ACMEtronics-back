const Router = require("express");
const { Order, User, Product, OrderLine } = require("../connection/db");



const postOrder = async (req, res, next) => {
  const { id, status, user_id } = req.body;
  if ((!id, !status))
    return res.status(400).json({ message: "incomplete order" });
    try {
        
    

  await Order.create({
    order_id: id,
    order_status: status,
    userId: user_id,
  })
  return res.status(200).send()
} catch (error) {
      next(error)  
} 
};

//trae todas las ordenes de todos los usuarios
const getOrder = async (req, res, next) => {
   await Order.findAll({
    include: {
      attributes: ["email"],
      model: User
    },
  })
    .then((order) => {
      if (order === null)
        return res.status(404).json({ message: "No hay ordenes" });

      return res.status(200).json({ order });
    })
    .catch(next);
};

//??Get order by orderId

const getOrderId = async(req, res, next) => {
  const { orderId } = req.params;

  await Order.findAll({
    attributes: ["id", "status", "userId"],
    where: {
      id: orderId,
    },
    include: {
      attributes: ["name", "price", "image", "id"],
      model: Product,
      through: {
        attributes: ["id", "quantity", "total"],
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
      attributes: ["name", "price", "image", "id"],
      model: Product,
      through: {
        attributes: ["id", "quantity", "total"],
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
        return res.status(200).json({ message: "Order eliminada" });
      });
    })
    .catch(next);
};

const postOrderUser= async (req, res, next) => {
  let { userId } = req.params;
  let { status } = req.body;

  if (status === "shopping_cart") {
    try {
      await User.findByPk(userId)
        .then((user) => {
          if (!user) {
            return res.sendStatus(404);
          }
          Order.findOrCreate({ where: { status, userId }, raw: true }).then(
            (order) => {
              const numOrder = order[0].dataValues
                ? order[0].dataValues.id
                : order[0].id;
              user.addOrder(numOrder).then(() => {
                return res.status(201).json({ orderId: numOrder });
              });
            }
          );
        })
        .catch((err) => {
          return res.sendStatus(500);
        });
    } catch (error) {
      next(error.message);
    }
  } else if (status === "created") {
   await Order.findOne({
      where: {
        userId: userId,
        status: "shopping_cart",
      },
    })
      .then((order) => {
        order.status = "created";
        order
          .save()
          .then((order) => {
            return res.send(order);
          })
          .catch((err) => {
            return res.sendStatus(500);
          });
      })
      .catch((err) => {
        return res.sendStatus(500);
      });
  } else if (status === "processing") {
    await Order.findOne({
      where: {
        userId: userId,
        status: "created",
      },
    })
      .then((order) => {
        order.status = "processing";
        order
          .save()
          .then((order) => {
            return res.send(order);
          })
          .catch((err) => {
            return res.sendStatus(500);
          });
      })
      .catch((err) => {
        return res.sendStatus(500);
      });
  }
};
module.exports = {
    postOrder,
    postOrderUser,
    deleteOrder,
    putOrder,
    getOrderId,
    getOrder
}