const express = require("express");
const router = express.Router();
const { posts: postsTable } = require("../models");
const { validateToken } = require("../middleware/auth-mw");

const notFoundResponse = (res) =>
  res.status(400).json({ message: "Entity not found" });
const notOwnedResponse = (res) =>
  res.status(403).json({ message: "Entity not owned" });

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
    return notFoundResponse(res);
  }

  res.json(dbPost);
});

router.put("/:id", validateToken, async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);

  if (!dbPost) {
    return notFoundResponse(res);
  }
  if (dbPost.userId !== req.user.id) {
    return notOwnedResponse(res);
  }

  res.json(await dbPost.update(req.body));
});

router.delete("/:id", validateToken, async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);

  if (!dbPost) {
    return notFoundResponse(res);
  }
  if (dbPost.userId !== req.user.id) {
    return notOwnedResponse(res);
  }

  await dbPost.destroy();
  res.json({ message: "Entity deleted" });
});

module.exports = router;
