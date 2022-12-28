const Router = require("express");
const { jwtVerify, SignJWT } = require("jose");
const { User, Product } = require("../connection/db");

// import validateLoginDTO from "../dto/validate_login_dto.js";
// const { authByEmailPwd } = require("../helpers/auth-by-email-pwd.js");

//Login con email y password
const authTokenRouterLog = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400)

  try {
    const searchUser = await User.findOne({
      where: { email: email, password: password }
    })
    let id = searchUser.id

    //GENERAR TOKEN Y DEVOLVER TOKEN
    const jwtConstructor = new SignJWT({ id });


    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.TOKEN_SECRET));
      
//     const user = await User.findOne({
//       where: {
//         id: id
//       },
//   })

    
      return res.status(200).send({ jwt, searchUser });
    
  } catch (err) {
    return res.sendStatus(401);
  }
};

//Solicitud autenticada con token para obtener el perfil del usuario
const authTokenRouterPerf = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(

      authorization,
      encoder.encode(process.env.TOKEN_SECRET)
    );
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return res.sendStatus(401);
    }
    // delete user.password;

    return res.send(user);
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = {
  authTokenRouterLog,
  authTokenRouterPerf
}