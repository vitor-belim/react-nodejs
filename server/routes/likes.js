const express = require("express");
const router = express.Router();
const { likes: likesTable, posts: postsTable } = require("../models");
const { validateToken } = require("../middleware/auth-mw");
const ResponseHelper = require("../helpers/response-helper");

router.get("/:postId", async (req, res) => {
  res.json(await likesTable.findAll({ where: { postId: req.params.postId } }));
});

router.post("/:postId", validateToken, async (req, res) => {
  let postId = +req.params.postId;

  let dbPost = await postsTable.findByPk(postId);
  if (!dbPost) {
    return ResponseHelper.entityNotFound(res);
  }

  let userId = req.user.id;

  let like = await likesTable.findOne({
    where: { postId, userId },
  });

  if (!like) {
    like = await likesTable.create({
      userId,
      postId,
    });
    res.json(await likesTable.findByPk(like.id));
  } else {
    await like.destroy();
    res.json({ message: "Like removed" });
  }
});

module.exports = router;
