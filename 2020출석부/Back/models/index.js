const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Chat = require('./Chat')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Student = require('./Student')(sequelize, Sequelize);
db.Club = require('./Club')(sequelize, Sequelize);
db.Attendance = require('./Attendance')(sequelize, Sequelize);
db.Absence = require('./Absence')(sequelize, Sequelize);
db.Class = require('./Class')(sequelize, Sequelize);
db.Teacher = require('./Teacher')(sequelize, Sequelize);

db.Club.hasMany(db.Student, { foreignKey: 'clubId', sourceKey: 'id' });
db.Student.belongsTo(db.Club, { foreignKey: 'clubId', targetKey: 'id' });
db.Student.hasMany(db.Attendance, { foreignKey: 'studentId', sourceKey: 'id' });
db.Attendance.belongsTo(db.Student, { foreignKey: 'studentId', targetKey: 'id' });
db.Class.hasMany(db.Student, { foreignKey: 'classId', sourceKey: 'id' });
db.Student.belongsTo(db.Class, { foreignKey: 'classId', targetKey: 'id' });
db.Student.hasMany(db.Absence, { foreignKey: 'studentId', sourceKey: 'id' });
db.Absence.belongsTo(db.Student, { foreignKey: 'studentId', targetKey: 'id' });
db.Teacher.hasMany(db.Chat, { foreignKey: 'teacherId', sourceKey: 'id' });
db.Chat.belongsTo(db.Teacher, { foreignKey: 'teacherId', targetKey: 'id' });

module.exports = db;