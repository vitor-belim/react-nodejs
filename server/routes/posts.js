const express = require("express");
const router = express.Router();
const { posts: postsTable } = require("../models");
const { validateToken } = require("../middleware/auth-mw");
const ResponseHelper = require("../helpers/response-helper");

router.get("/", async (req, res) => {
  res.json(await postsTable.findAll({ order: [["id", "DESC"]] }));
});

router.post("/", validateToken, async (req, res) => {
  let newPost = await postsTable.create({ ...req.body, userId: req.user.id });
  res.json(await postsTable.findByPk(newPost.id));
});

router.get("/:id", async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);

  if (!dbPost) {
    return ResponseHelper.entityNotFound(res);
  }

  res.json(dbPost);
});

router.put("/:id", validateToken, async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);

  if (!dbPost) {
    return ResponseHelper.entityNotFound(res);
  }
  if (dbPost.user.id !== req.user.id) {
    return ResponseHelper.entityNotOwned(res);
  }

  res.json(await dbPost.update(req.body));
});

router.delete("/:id", validateToken, async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);

  if (!dbPost) {
    return ResponseHelper.entityNotFound(res);
  }
  if (dbPost.user.id !== req.user.id) {
    return ResponseHelper.entityNotOwned(res);
  }

  await dbPost.destroy();
  ResponseHelper.entityDeleted(res);
});

module.exports = router;
