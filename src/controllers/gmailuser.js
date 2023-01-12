const { Op } = require("sequelize");
const { Gmailuser, Order } = require("../connection/db");

const getAllGmailusers = async (req, res) => {
    let all = await Gmailuser.findAll({
        include: {
          model: Order, 
          as: "GmailuserOrder",
          attributes: ["id",],
        through: { attributes: [] },
        }
      });
  res.send(all)
}

const createGmailuser = async (req, res, next) => {
    const {given_name, family_name, email, nickname} = req.body
    const findEmail = await Gmailuser.findOne({ where: { email } });
        if (findEmail) {return res.status(200).json({ msg: "Email ya registrado", findEmail });}
    try {
      
      const created =  await Gmailuser.findOrCreate({ 
      where : {
        given_name: given_name,
        family_name: family_name,
        email: email,
        nickname: nickname,
      }
    });

    if (!created)
    return res.status(200).json({ msg: "Usuario encontrado " }); 

     res.status(201).send(created);
    } catch (error) {
      next(error)
    }
}

const deleteGmailuser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedUser = await Gmailuser.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedUser) return 0;
    await Gmailuser.destroy({ where: { id: id } });

    return res.status(200).json("User deleted");
  } catch (error) {
    return res.status(500).send(`User could not be deleted (${error})`);
  }
};

module.exports = {
    getAllGmailusers,
    createGmailuser,
    deleteGmailuser,
  };