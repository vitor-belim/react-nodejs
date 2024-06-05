const { verify, decode } = require("jsonwebtoken");
const { users: usersTable } = require("../models");

const validateToken = async (req, res, next) => {
  const accessToken = req.headers["access-token"];

  if (!accessToken) {
    return res.status(401).send({ message: "Access token required" });
  }

  try {
    let validToken = verify(accessToken, process.env.LOCAL_JWT_SALT);

    if (!validToken) {
      return res.status(401).send({ message: "Invalid access token" });
    }
  } catch (e) {
    return res.status(401).send({ message: "JWT decoding failed", error: e });
  }

  let jwt = decode(accessToken, process.env.LOCAL_JWT_SALT);
  if (jwt) {
    const userId = parseInt(jwt.id);
    if (userId && userId > 0) {
      const dbUser = await usersTable.findByPk(userId);
      if (dbUser) {
        req.user = dbUser;
        return next();
      }
    }
  }

  return res.status(401).send({ message: "Invalid JWT" });
};

module.exports = { validateToken };
