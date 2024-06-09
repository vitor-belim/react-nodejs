const express = require("express");
const router = express.Router();
const { comments: commentsTable, users: usersTable } = require("../models");
const { validateToken } = require("../middleware/auth-mw");
const ResponseHelper = require("../helpers/response-helper");

router.get("/:postId", async (req, res) => {
  res.json(
    await commentsTable.findAll({
      where: { postId: req.params.postId },
      order: [["id", "DESC"]],
      include: usersTable,
    }),
  );
});

router.post("/:postId", validateToken, async (req, res) => {
  let newComment = await commentsTable.create({
    ...req.body,
    postId: +req.params.postId,
    userId: req.user.id,
  });
  res.json(await commentsTable.findByPk(newComment.id));
});

router.delete("/:commentId", validateToken, async (req, res) => {
  let dbComment = await commentsTable.findByPk(+req.params.commentId);

  if (!dbComment) {
    return ResponseHelper.entityNotFound(res);
  }
  if (dbComment.user.id !== req.user.id) {
    return ResponseHelper.entityNotOwned(res);
  }

  await dbComment.destroy();
  ResponseHelper.entityDeleted(res);
});

module.exports = router;
