const { Op } = require("sequelize");
const { Gmailuser } = require("../connection/db");

const getAllGmailusers = async (req, res) => {
    let all = await Gmailuser.findAll({
        order: [["id", "ASC"]],
      });
  res.send(all)
}

const createGmailuser = async (req, res, next) => {
    const {given_name, family_name, email, nickname} = req.body
    try {
      const findEmail = await Gmailuser.findOne({ where: { email } });
        if (findEmail) {return res.status(200).json({ msg: "Email ya registrado", findEmail });}
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

module.exports = {
    getAllGmailusers,
    createGmailuser,
  };