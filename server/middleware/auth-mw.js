const { verify } = require("jsonwebtoken");
const { users: usersTable } = require("../models");

const requiredTokenResponse = (res) =>
  res.status(401).send({ message: "Access token required" });
const invalidTokenResponse = (res) =>
  res.status(401).send({ message: "Invalid access token" });
const invalidJWTResponse = (res, error) =>
  res.status(401).send({ message: "JWT decoding failed", error });

const validateToken = async (req, res, next) => {
  const accessToken = req.headers["access-token"];

  if (!accessToken) {
    return requiredTokenResponse(res);
  }

  try {
    let validToken = verify(accessToken, process.env.LOCAL_JWT_SALT);
    if (!validToken || !validToken.id) {
      return invalidTokenResponse(res);
    }

    const dbUser = await usersTable.findByPk(validToken.id);
    if (!dbUser) {
      return invalidTokenResponse(res);
    }

    req.user = dbUser;
    return next();
  } catch (e) {
    return invalidJWTResponse(res, e);
  }
};

module.exports = { validateToken };
