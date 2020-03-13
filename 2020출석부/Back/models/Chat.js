module.exports = (sequelize, DataTypes) => sequelize.define('chat', {
  content: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  floor: {
    type: DataTypes.TINYINT,
    allowNull: false
  }
}, {
  timestamps: true,
  charset: 'utf8',
  collate: 'utf8_general_ci'
});