module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  username: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  charset: 'utf8',
  collate: 'utf8_general_ci'
});