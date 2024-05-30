const express = require("express");
const router = express.Router();
const { Comments: commentsTable } = require("../models");

router.get("/:postId", async (req, res) => {
  res.json(
    await commentsTable.findAll({ where: { postId: req.params.postId } }),
  );
});

router.post("/:postId", async (req, res) => {
  res.json(
    await commentsTable.create({ ...req.body, postId: +req.params.postId }),
  );
});

module.exports = router;
