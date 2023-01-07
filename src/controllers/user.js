const { Op } = require("sequelize");
const { User, Product } = require("../connection/db");

const getAllUsers = async (req, res) => {
  const { name } = req.query;
  let userTable = await User.findAll({
    order: [["id", "ASC"]],
  });
  if (userTable.length > 1) return res.send(userTable);
  if (userTable.length === 0) {
    try {
      let users = require("../data/users.json");
      users = users.map((u) => {
        return {
          firstname: u.name["firstname"],
          lastname: u.name["lastname"],
          email: u.email,
          username: u.username,
          password: u.password,
          admin: u.admin ? u.admin : false,
          banned: u.banned ? u.banned : false,
        };
      });
      await User.bulkCreate(users);

      userTable = await User.findAll({
        order: [["id", "ASC"]],
      });

      return res.send(userTable);
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    if (name) {
      const specificUser = await Product.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
      });

      if (specificUser.length > 0) return res.status(200).send(specificUser);

      return res.status(404).send("No such User");
    }
  }
};

const getUserById = async (req, res) => {
  const selectedUser = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (selectedUser) {
    res.status(200).send(selectedUser);
  } else {
    res.sendStatus(404);
  }
};

// const updateUser = async (req, res, next) => {
//   const { id } = req.params;
//   const {
//     email,
//     password,
//     name,
//     firstname,
//     lastName,
//     street,
//     city,
//     number,
//     admin,
//     banned,
//   } = req.body;

//   try {
//     if (!id) return res.status(400).json({ msg: "Id no provisto" });
//     const user = await User.findByPk(id);
//     if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

//     const updateUser = await user.update({
//       email: email,
//       password: password,
//       name: name,
//       firstname: firstname,
//       lastName: lastName,
//       street: street,
//       city: city,
//       number: number,
//       admin: admin,
//       banned: banned,
//     });

//     if (!updateUser)
//       return res.status(200).json({ msg: "No se pudo actualizar el usuario" });
//     res.status(201).json({ msg: "Usuario actualizado", usuario: updateUser });
//   } catch (error) {
//     next(error);
//   }
// };

const updateUser = async (req, res) => {
  try {
    const selectedUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (selectedUser) {
      let data = { ...req.body };

      let keys = Object.keys(data);

      keys.forEach((k) => {
        selectedUser[k] = data[k];
      });

      await selectedUser.save();

      res
        .status(200)
        .json({ msg: "Usuario actualizado", usuario: selectedUser });
    } else {
      res.status(404).json({ msg: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el usuario", error });
  }
};

const createUser = async (req, res, next) => {
  const {
    username,
    email,
    password,
    name,
    firstname,
    lastname,
    street,
    city,
    number,
  } = req.body;
  try {
    if (!username)
      return res.status(400).json({ msg: "Username de usuario no provisto" });
    if (!email)
      return res.status(400).json({ msg: "Email de usuario no provisto" });
    if (!password)
      return res.status(400).json({ msg: "Password de usuario no provisto" });

    const findEmail = await User.findOne({ where: { email } });
    if (findEmail) {
      return res.status(200).json({ msg: "Email ya registrado", findEmail });
    }

    const [user, created] = await User.findOrCreate({
      where: {
        username: username,
        email: email,
        password: password,
      },
      defaults: {
        name,
        firstname,
        lastname,
        city,
        street,
        number,
      },
    });

    if (!created)
      return res.status(200).json({ msg: "Usuario encontrado ", user });
    res.status(201).json({ msg: "Usuario creado", user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedUser) return 0;
    await User.destroy({ where: { id: id } });

    return res.status(200).json("User deleted");
  } catch (error) {
    return res.status(500).send(`User could not be deleted (${error})`);
  }
};
const getUserByEmail = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body,26)
  if (!email || !password) return res.status(400);

  try {
    const searchUser = await User.findOne({
      where: { email: email, password: password },
    });

    return res.status(200).send({ searchUser });
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = {
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
};
