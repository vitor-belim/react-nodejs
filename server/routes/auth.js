const express = require("express");
const router = express.Router();
const { users: usersTable } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/auth-mw");

const signAccessToken = (id, username) => {
  return sign({ id, username }, process.env.LOCAL_JWT_SALT);
};
const successAuthResponse = (res, message, user) => {
  return res.json({
    message,
    user: { id: user.id, username: user.username },
    accessToken: signAccessToken(user.id, user.username),
  });
};

const usernameNotAvailableResponse = (res) =>
  res.status(400).json({ message: "Username is already in use" });
const passwordEncryptionFailedResponse = (res, error) =>
  res.status(400).json({ message: "Password encryption failed", error });
const invalidAuthResponse = (res) =>
  res.status(400).json({ message: "Invalid username or password" });
const invalidPasswordResponse = (res) =>
  res.status(400).json({ message: "Invalid password" });

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;

  let dbUser = await usersTable.findOne({ where: { username } });
  if (dbUser) {
    return usernameNotAvailableResponse(res);
  }

  await bcrypt
    .hash(password, parseInt(process.env.LOCAL_PASSWORD_SALT))
    .then(async (hashedPassword) => {
      dbUser = await usersTable.create({ username, password: hashedPassword });
      successAuthResponse(res, "User successfully created", dbUser);
    })
    .catch((error) => {
      passwordEncryptionFailedResponse(error);
    });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let dbUser = await usersTable.findOne({
    where: { username },
    attributes: { include: ["password"] },
  });
  if (!dbUser) {
    return invalidAuthResponse(res);
  }

  const saltRes = await bcrypt.compare(password, dbUser.password);
  if (!saltRes) {
    return invalidAuthResponse(res);
  }

  successAuthResponse(res, "Login successful", dbUser);
});

router.get("/refresh", validateToken, async (req, res) => {
  successAuthResponse(res, "Access token is valid", req.user);
});

router.post("/update-password", validateToken, async (req, res) => {
  const { password, newPassword } = req.body;

  let dbUser = await usersTable.findByPk(req.user.id, {
    attributes: { include: ["password"] },
  });

  const saltRes = await bcrypt.compare(password, dbUser.password);
  if (!saltRes) {
    return invalidPasswordResponse(res);
  }

  await bcrypt
    .hash(newPassword, parseInt(process.env.LOCAL_PASSWORD_SALT))
    .then(async (hashedPassword) => {
      await dbUser.update({ password: hashedPassword });
      successAuthResponse(res, "Password successfully updated", dbUser);
    })
    .catch((error) => {
      passwordEncryptionFailedResponse(error);
    });
});

module.exports = router;
