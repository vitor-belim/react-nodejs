module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("comments", {
    commentBody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.users, {
      onDelete: "CASCADE",
    });
    Comments.belongsTo(models.posts, {
      onDelete: "CASCADE",
    });

    Comments.addScope("defaultScope", {
      include: [
        {
          model: models.users,
        },
        {
          model: models.posts,
          include: [
            {
              model: models.users,
            },
          ],
        },
      ],
      attributes: {
        exclude: ["userId", "postId", "createdAt", "updatedAt"],
      },
    });
  };

  return Comments;
};
