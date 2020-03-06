module.exports = (sequelize, DataTypes) => sequelize.define('attendance', {
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  period: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: { // 0이면 출석, 1이면 현체 2이면 외출 3면 공결 4면 무단 5면 지각
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  reason: {
    type: DataTypes.STRING(128),
    allowNull: true
  }
}, {
  timestamps: true,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});