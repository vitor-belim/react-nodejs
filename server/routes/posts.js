const express = require("express");
const router = express.Router();
const { posts: postsTable } = require("../models");
const { validateToken } = require("../middleware/auth-mw");

const entityNotFoundResponse = { message: "Entity not found" };
const entityDeletedResponse = { message: "Entity deleted" };
const entityNotOwned = { message: "Entity not owned" };

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
    return res.json(entityNotFoundResponse);
  }
  res.json(dbPost);
});

router.put("/:id", validateToken, async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);
  if (!dbPost) {
    return res.json(entityNotFoundResponse);
  }
  if (dbPost.userId !== req.user.id) {
    return res.status(403).json(entityNotOwned);
  }
  res.json(await dbPost.update(req.body));
});

router.delete("/:id", validateToken, async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);
  if (!dbPost) {
    return res.json(entityNotFoundResponse);
  }
  if (dbPost.userId !== req.user.id) {
    return res.status(403).json(entityNotOwned);
  }
  await dbPost.destroy();
  res.json(entityDeletedResponse);
});

module.exports = router;
