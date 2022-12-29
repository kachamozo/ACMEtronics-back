const Router = require("express");
const { jwtVerify, SignJWT } = require("jose");
const { User, Product } = require("../connection/db");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400);

  try {
    const searchUser = await User.findOne({
      where: { email: email, password: password },
    });
    let id = searchUser.id;

    const jwtConstructor = new SignJWT({ id });

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.TOKEN_SECRET));

    return res.status(200).send({ jwt, searchUser });
  } catch (err) {
    return res.sendStatus(401);
  }
};

const profileUser = async (req, res) => {
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

    return res.send(user);
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = {
  loginUser,
  profileUser,
};
