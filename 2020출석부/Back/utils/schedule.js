const schedule = require("node-schedule");
const { Attendance, Student, Absence, Sequelize } = require("../models");
const { encodeDate, decodeDate } = require("./encodeDate");
const { Op } = Sequelize;

module.exports = () => {
  return schedule.scheduleJob("0 0 0 * * MON-FRI", async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    try {
      const absences = await Absence.findAll();
      const students = await Student.findAll();
      let promises = [];
      students.forEach(async (v) => {
        for (let period = 7; period <= 10; period++) {
          promises.push(
            Attendance.create({
              year,
              month,
              day,
              period,
              studentId: v.id,
            })
          );
        }
      });
      Promise.all(promises)
        .then(() => {
          let promises2 = [];
          absences.forEach((v) => {
            const { from, to, reason, studentId, id, purpose } = v;
            const encoded = encodeDate(year - 2000, month, day, 7);
            const obj = decodeDate(from, to);
            const f = Math.floor;
            if (
              f(from / 100) <= f(encoded / 100) &&
              f(to / 100) >= f(encoded / 100)
            ) {
              let periods = [];
              if (
                f(from / 100) === f(encoded / 100) &&
                f(to / 100) === f(encoded / 100)
              ) {
                for (var i = obj.fromPeriod; i <= obj.toPeriod; i++)
                  periods.push({ period: i });
              } else if (
                f(from / 100) === f(encoded / 100) ||
                f(to / 100) === f(encoded / 100)
              ) {
                if (f(from / 100) === f(encoded / 100)) {
                  for (var i = obj.fromPeriod; i <= 10; i++)
                    periods.push({ period: i });
                } else {
                  for (var i = 7; i <= obj.toPeriod; i++)
                    periods.push({ period: i });
                }
              } else {
                for (var i = 7; i <= 10; i++) periods.push({ period: i });
              }
              promises2.push(
                Attendance.update(
                  {
                    status: purpose,
                    reason,
                  },
                  {
                    where: {
                      [Op.and]: [{ year }, { month }, { day }, { studentId }],
                      [Op.or]: periods,
                    },
                  }
                )
              );
            } else if (f(to / 100) < f(encoded / 100)) {
              promises2.push(Absence.destroy({ where: { id } }));
            }
          });
          return Promise.all(promises2);
        })
        .then(() => {
          console.log("good");
        })
        .catch((err) => {
          throw err;
        });
    } catch (e) {
      console.error(e);
    }
  });
};
