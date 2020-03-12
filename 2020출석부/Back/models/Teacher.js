module.exports = (sequelize, DataTypes) => sequelize.define('teacher', {
  name: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  charset: 'utf8',
  collate: 'utf8_general_ci'
});