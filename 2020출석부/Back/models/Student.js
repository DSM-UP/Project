module.exports = (sequelize, DataTypes) => sequelize.define('student', {
  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {
  charset: 'utf8',
  collate: 'utf8_general_ci'
});