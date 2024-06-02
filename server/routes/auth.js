const express = require("express");
const router = express.Router();
const { Users: usersTable } = require("../models");
const bcrypt = require("bcrypt");

const PASSWORD_SALT = 10;
const usernameExistsResponse = { message: "Username is already in use" };
const userCreatedResponse = { message: "User successfully created!" };
const invalidLoginResponse = { message: "Invalid username or password" };
const loginSuccessResponse = { message: "Login successful" };

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  let dbUser = await usersTable.findOne({ where: { username } });
  if (dbUser) {
    res.status(400).json(usernameExistsResponse);
    return;
  }

  await bcrypt.hash(password, PASSWORD_SALT).then((hashedPassword) => {
    usersTable.create({ username, password: hashedPassword });
    res.json(userCreatedResponse);
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let dbUser = await usersTable.findOne({ where: { username } });
  if (!dbUser) {
    res.status(400).json(invalidLoginResponse);
    return;
  }

  await bcrypt.compare(password, dbUser.password).then((saltRes) => {
    if (!saltRes) {
      res.status(400).json(invalidLoginResponse);
      return;
    }

    res.json(loginSuccessResponse);
  });
});

module.exports = router;
