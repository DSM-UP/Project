const schedule = require('node-schedule');
const {Attendance, Student} = require('../models');

module.exports = () => {
    return schedule.scheduleJob('0 0 0 * * MON-FRI', async () => {
        const students = await Student.findAll();
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        for(i in students) {
            for(var period = 7; period <= 10; period++) {
                await Attendance.create({
                    year,
                    month,
                    day,
                    period,
                    userId:students[i].id
                });
            }
        }
    });
}