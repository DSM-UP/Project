module.exports = (sequelize, DataTypes) =>
  sequelize.define("report", {
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  });
