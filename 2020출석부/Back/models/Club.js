module.exports = (sequelize, DataTypes) => sequelize.define('club', {
  name: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  place: {
    type: DataTypes.STRING(32),
    allowNull: true
  }
}, {
  charset: 'utf8',
  collate: 'utf8_general_ci'
});