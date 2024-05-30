const express = require("express");
const router = express.Router();
const { Posts: postsTable } = require("../models");

const entityNotFoundResponse = { message: "Entity not found" };
const entityDeletedResponse = { message: "Entity deleted" };

router.get("/", async (req, res) => {
  res.json(await postsTable.findAll({ order: [["id", "DESC"]] }));
});

router.post("/", async (req, res) => {
  res.json(await postsTable.create(req.body));
});

router.get("/:id", async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);
  if (!dbPost) {
    return res.json(entityNotFoundResponse);
  }
  res.json(dbPost);
});

router.put("/:id", async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);
  if (!dbPost) {
    return res.json(entityNotFoundResponse);
  }
  res.json(await dbPost.update(req.body));
});

router.delete("/:id", async (req, res) => {
  const dbPost = await postsTable.findByPk(req.params.id);
  if (!dbPost) {
    return res.json(entityNotFoundResponse);
  }
  await dbPost.destroy();
  res.json(entityDeletedResponse);
});

module.exports = router;
