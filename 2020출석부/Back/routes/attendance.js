const router = require("express").Router();
const xlsx = require("xlsx");
const path = require("path");
const beforeCheck = require("../middlewares/beforeCheck");
const jwtCheck = require("../middlewares/jwtCheck");
const {
  Student,
  Attendance,
  Sequelize,
  sequelize,
  Class,
} = require("../models");
const { Op } = Sequelize;

router.get("/teachers", beforeCheck, async (req, res, next) => {
  const { year, month, day } = req.query;
  const wb = xlsx.readFile(
    path.join(__dirname, "../documents/managerSchedule.xlsx"),
    {
      cellDates: true,
    }
  );
  const ws = wb.Sheets["managerSchedule"];
  const data = xlsx.utils.sheet_to_json(ws);
  let teachers = data.filter((d) => {
    const date = d.date;
    date.setDate(date.getDate() + 1);
    if (
      date.getFullYear() === Number(year) &&
      date.getMonth() + 1 === Number(month) &&
      date.getDate() === Number(day)
    ) {
      return true;
    }
  });
  teachers = teachers[0];
  res.status(200).json({ teachers });
});

router.get("/club/:clubId", jwtCheck, async (req, res, next) => {
  const { clubId } = req.params;
  const { period } = req.query;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  try {
    const students = await Student.findAll({ where: { clubId } });
    let ids = [];
    students.forEach((v) => ids.push(v.id));
    const attendances = await Attendance.findAll({
      where: {
        [Op.and]: [{ year }, { month }, { day }, { period }],
        [Op.or]: [{ studentId: ids }],
      },
      include: [{ model: Student, required: true }],
    });
    res.status(200).json({ attendances });
  } catch (e) {
    next(e);
  }
});

router.get("/class/:classId", jwtCheck, async (req, res, next) => {
  const { classId } = req.params;
  const { period } = req.query;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  try {
    const students = await Student.findAll({ where: { classId } });
    let ids = [];
    students.forEach((v) => ids.push(v.id));
    const attendances = await Attendance.findAll({
      where: {
        [Op.and]: [{ year }, { month }, { day }, { period }],
        [Op.or]: [{ studentId: ids }],
      },
      include: [{ model: Student, required: true }],
    });
    attendances.sort((a, b) => a.student.number - b.student.number);
    res.status(200).json({ attendances });
  } catch (e) {
    next(e);
  }
});

router.patch("/", jwtCheck, async (req, res, next) => {
  const { unsaved } = req.body;
  let promises = [];
  unsaved.forEach((v) =>
    promises.push(
      Attendance.update(
        {
          reason: v.reason,
          status: v.status,
        },
        {
          where: { id: v.id },
        }
      )
    )
  );
  Promise.all(promises)
    .then(() => res.status(200).json({}))
    .catch((err) => next(err));
});

router.get("/student/:studentId", jwtCheck, async (req, res, next) => {
  const { studentId } = req.params;
  const page = req.query.page * 15;
  try {
    const attendances = await Attendance.findAll({
      where: {
        [Op.and]: [{ studentId }],
        [Op.or]: [{ status: [1, 2, 3, 4, 5] }],
      },
      order: sequelize.literal("id DESC"),
      limit: 16,
      offset: page,
    });
    res.status(200).json({ attendances });
  } catch (err) {
    next(err);
  }
});

router.get("/date", jwtCheck, async (req, res, next) => {
  const { year, month, day, period } = req.query;
  const page = req.query.page * 15;
  try {
    const attendances = await Attendance.findAll({
      where: {
        [Op.and]: [{ year }, { month }, { day }, { period }],
        [Op.or]: [{ status: [1, 2, 3, 4, 5] }],
      },
      order: sequelize.literal("id DESC"),
      limit: 16,
      offset: page,
      include: [
        {
          model: Student,
          required: true,
          include: [{ model: Class, required: true }],
        },
      ],
    });
    res.status(200).json({ attendances });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
