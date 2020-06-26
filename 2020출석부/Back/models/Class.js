module.exports = (sequelize, DataTypes) => sequelize.define('class', {
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});