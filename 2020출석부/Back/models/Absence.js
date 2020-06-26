module.exports = (sequelize, DataTypes) => sequelize.define('absence', {
  reason: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  from: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  to: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  purpose: {
    type: DataTypes.TINYINT, // 1이면 현체 2이면 외출 3면 공결
    allowNull: false
  }
}, {
  charset: 'utf8',
  collate: 'utf8_general_ci'
});