const express = require("express");
const router = express.Router();
const { Posts: postsTable } = require("../models");

router.get("/", async (req, res) => {
  res.json(await postsTable.findAll({ order: [["id", "DESC"]] }));
});

router.post("/", async (req, res) => {
  res.json(await postsTable.create(req.body));
});

router.get("/:id", async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);
  if (!dbPost) {
    return res.json({ message: "Entity not found" });
  }
  res.json(dbPost);
});

router.put("/:id", async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);
  if (!dbPost) {
    return res.json({ message: "Entity not found" });
  }
  res.json(await dbPost.update(req.body));
});

router.delete("/:id", async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);
  if (!dbPost) {
    return res.json({ message: "Entity not found" });
  }
  await dbPost.destroy();
  res.json({ message: "Entity deleted" });
});

module.exports = router;
