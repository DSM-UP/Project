const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./User')(sequelize, Sequelize);
db.Student = require('./Student')(sequelize, Sequelize);
db.Club = require('./Club')(sequelize, Sequelize);
db.Attendance = require('./Attendance')(sequelize, Sequelize);

db.Club.hasMany(db.Student, {foreignKey:'clubId', sourceKey:'id'});
db.Student.belongsTo(db.Club, {foreignKey:'clubId', targetKey:'id'});
db.Student.hasMany(db.Attendance, {foreignKey:'userId', sourceKey:'id'});
db.Attendance.belongsTo(db.Student, {foreignKey:'userId', targetKey:'id'});

module.exports = db;