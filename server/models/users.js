module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (_models) => {
    Users.addScope("defaultScope", {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
  };

  return Users;
};
