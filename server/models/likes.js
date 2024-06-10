module.exports = (sequelize, _DataTypes) => {
  const Likes = sequelize.define("likes", {});

  Likes.associate = (models) => {
    Likes.belongsTo(models.users, {
      onDelete: "CASCADE",
    });
    Likes.belongsTo(models.posts, {
      onDelete: "CASCADE",
    });

    Likes.addScope("defaultScope", {
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

  return Likes;
};
