const express = require("express");
const router = express.Router();
const { users: usersTable } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const usernameExistsResponse = { message: "Username is already in use" };
const userCreatedResponse = { message: "User successfully created!" };
const invalidLoginResponse = { message: "Invalid username or password" };
const loginSuccessResponse = { message: "Login successful" };

const addAccessTokenToResponse = (response, id, username) => {
  const token = sign({ id, username }, process.env.LOCAL_JWT_SALT);

  return { ...response, accessToken: token };
};

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;

  let dbUser = await usersTable.findOne({ where: { username } });
  if (dbUser) {
    res.status(400).json(usernameExistsResponse);
    return;
  }

  await bcrypt
    .hash(password, parseInt(process.env.LOCAL_PASSWORD_SALT))
    .then(async (hashedPassword) => {
      dbUser = await usersTable.create({ username, password: hashedPassword });
      res.json(
        addAccessTokenToResponse(
          userCreatedResponse,
          dbUser.id,
          dbUser.username,
        ),
      );
    });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let dbUser = await usersTable.findOne({
    where: { username },
    attributes: { include: ["password"] },
  });
  if (dbUser) {
    const saltRes = await bcrypt.compare(password, dbUser.password);
    if (saltRes) {
      res.json(
        addAccessTokenToResponse(
          loginSuccessResponse,
          dbUser.id,
          dbUser.username,
        ),
      );
      return;
    }
  }

  res.status(400).json(invalidLoginResponse);
});

module.exports = router;
