const express = require("express");
const router = express.Router();
const { Posts: postsTable } = require("../models");

router.get("/", async (req, res) => {
  res.json(await postsTable.findAll());
});

router.post("/", async (req, res) => {
  res.json(await postsTable.create(req.body));
});

module.exports = router;
