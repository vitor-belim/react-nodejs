const { verify } = require("jsonwebtoken");
const { users: usersTable } = require("../models");

const validateToken = async (req, res, next) => {
  const accessToken = req.headers["access-token"];

  if (!accessToken) {
    return res.status(401).send({ message: "Access token required" });
  }

  try {
    let validToken = verify(accessToken, process.env.LOCAL_JWT_SALT);

    if (!validToken || !validToken.id) {
      return res.status(401).send({ message: "Invalid access token" });
    }

    req.user = await usersTable.findByPk(validToken.id);
    return next();
  } catch (e) {
    return res.status(401).send({ message: "JWT decoding failed", error: e });
  }
};

module.exports = { validateToken };
