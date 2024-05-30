module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
