const express = require("express");
const router = express.Router();
const { users: usersTable, posts: postsTable } = require("../models");
const ResponseHelper = require("../helpers/response-helper");

router.get("/:id", async (req, res) => {
  const dbUser = await usersTable.findByPk(req.params.id);

  if (!dbUser) {
    return ResponseHelper.entityNotFound(res);
  }

  res.json(dbUser);
});

router.get("/:id/posts", async (req, res) => {
  const dbUser = await usersTable.findByPk(req.params.id);
  if (!dbUser) {
    return ResponseHelper.entityNotFound(res);
  }

  const posts = await postsTable.findAll({
    where: { userId: req.params.id },
    order: [["id", "DESC"]],
  });

  res.json(posts);
});

module.exports = router;
