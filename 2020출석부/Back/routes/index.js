const router = require("express").Router();
const xlsx = require("xlsx");
const path = require("path");
const { Teacher, Class, Student, Sequelize, Club } = require("../models");
const { Op } = Sequelize;
const jwtCheck = require("../middlewares/jwtCheck");

router.get("/activity", jwtCheck, async (req, res, next) => {
  const { year, month, day } = req.query;
  const wb = xlsx.readFile(
    path.join(__dirname, "../documents/afterSchoolSchedule.xlsx"),
    {
      cellDates: true,
    }
  );
  const ws = wb.Sheets["afterSchoolSchedule"];
  const data = xlsx.utils.sheet_to_json(ws);
  let activity = data.filter((d) => {
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
  activity = activity[0];
  res.status(200).json({ activity });
});

router.patch("/activity", jwtCheck, async (req, res, next) => {
  const { year, month, day } = req.query;
  const { activity } = req.body;
  const wb = xlsx.readFile(
    path.join(__dirname, "../documents/afterSchoolSchedule.xlsx"),
    {
      cellDates: true,
    }
  );
  const ws = wb.Sheets["afterSchoolSchedule"];
  const data = xlsx.utils.sheet_to_json(ws);
  for (idx in data) {
    const _date = data[idx].date;
    const date = new Date(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate() + 1
    );
    if (
      date.getFullYear() === Number(year) &&
      date.getMonth() + 1 === Number(month) &&
      date.getDate() === Number(day)
    ) {
      data[idx].work = activity;
      break;
    }
  }
  const newWb = xlsx.utils.book_new();
  const newWs = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(newWb, newWs, "afterSchoolSchedule");
  xlsx.writeFile(
    newWb,
    path.join(__dirname, "../documents/afterSchoolSchedule.xlsx")
  );
  res.status(200).json({});
});

router.patch("/activity-each", jwtCheck, async (req, res, next) => {
  const { date1, date2 } = req.body;
  let workIdx1 = null,
    workIdx2 = null;
  const wb = xlsx.readFile(
    path.join(__dirname, "../documents/afterSchoolSchedule.xlsx"),
    {
      cellDates: true,
    }
  );
  const ws = wb.Sheets["afterSchoolSchedule"];
  const data = xlsx.utils.sheet_to_json(ws);
  if (
    Number(date1[0]) !== Number(date2[0]) ||
    Number(date1[1]) !== Number(date2[1]) ||
    Number(date1[2]) !== Number(date2[2])
  ) {
    for (idx in data) {
      const _date = data[idx].date;
      const date = new Date(
        _date.getFullYear(),
        _date.getMonth(),
        _date.getDate() + 1
      );
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (
        (year === Number(date1[0]) &&
          month === Number(date1[1]) &&
          day === Number(date1[2])) ||
        (year === Number(date2[0]) &&
          month === Number(date2[1]) &&
          day === Number(date2[2]))
      ) {
        if (
          year === Number(date1[0]) &&
          month === Number(date1[1]) &&
          day === Number(date1[2])
        ) {
          workIdx1 = idx;
        } else {
          workIdx2 = idx;
        }
        if (workIdx1 !== null && workIdx2 !== null) break;
      }
    }
    let temp = data[workIdx1].work;
    data[workIdx1].work = data[workIdx2].work;
    data[workIdx2].work = temp;
    const newWb = xlsx.utils.book_new();
    const newWs = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(newWb, newWs, "afterSchoolSchedule");
    xlsx.writeFile(
      newWb,
      path.join(__dirname, "../documents/afterSchoolSchedule.xlsx")
    );
  }
  res.status(200).json({});
});

router.get("/teachers", jwtCheck, async (req, res, next) => {
  try {
    const teachers = await Teacher.findAll({});
    res.status(200).json({ teachers });
  } catch (e) {
    next(e);
  }
});

router.get("/teachers/specific", jwtCheck, (req, res) => {
  const { year, month, day } = req.query;
  const wb = xlsx.readFile(
    path.join(__dirname, "../documents/managerSchedule.xlsx"),
    {
      cellDates: true,
    }
  );
  const ws = wb.Sheets["managerSchedule"];
  const data = xlsx.utils.sheet_to_json(ws);
  let teachers;
  for (idx in data) {
    const _date = data[idx].date;
    const date = new Date(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate() + 1
    );
    if (
      date.getFullYear() === Number(year) &&
      date.getMonth() + 1 === Number(month) &&
      date.getDate() === Number(day)
    ) {
      teachers = data[idx];
      break;
    }
  }
  console.log(teachers);
  res.status(200).json({ teachers });
});

router.patch("/teachers", jwtCheck, (req, res) => {
  const { year, month, day } = req.query;
  const { f2, f3, f4 } = req.body;
  const wb = xlsx.readFile(
    path.join(__dirname, "../documents/managerSchedule.xlsx"),
    {
      cellDates: true,
    }
  );
  const ws = wb.Sheets["managerSchedule"];
  const data = xlsx.utils.sheet_to_json(ws);
  for (idx in data) {
    const _date = data[idx].date;
    const date = new Date(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate() + 1
    );
    if (
      date.getFullYear() === Number(year) &&
      date.getMonth() + 1 === Number(month) &&
      date.getDate() === Number(day)
    ) {
      data[idx].f2 = f2;
      data[idx].f3 = f3;
      data[idx].f4 = f4;
      break;
    }
  }
  const newWb = xlsx.utils.book_new();
  const newWs = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(newWb, newWs, "managerSchedule");
  xlsx.writeFile(
    newWb,
    path.join(__dirname, "../documents/managerSchedule.xlsx")
  );
  res.status(200).json({});
});

router.patch("/teacher-each", jwtCheck, (req, res) => {
  const { date1, date2, selected1, selected2, floor1, floor2 } = req.body;
  let teacherIdx1 = null,
    teacherIdx2 = null;
  if (date1[0] !== date2[0] || date1[1] !== date2[1] || date1[2] !== date2[2]) {
    const wb = xlsx.readFile(
      path.join(__dirname, "../documents/managerSchedule.xlsx"),
      {
        cellDates: true,
      }
    );
    const ws = wb.Sheets["managerSchedule"];
    const data = xlsx.utils.sheet_to_json(ws);
    for (idx in data) {
      const _date = data[idx].date;
      const date = new Date(
        _date.getFullYear(),
        _date.getMonth(),
        _date.getDate() + 1
      );
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (
        (year === Number(date1[0]) &&
          month === Number(date1[1]) &&
          day === Number(date1[2])) ||
        (year === Number(date2[0]) &&
          month === Number(date2[1]) &&
          day === Number(date2[2]))
      ) {
        if (
          year === Number(date1[0]) &&
          month === Number(date1[1]) &&
          day === Number(date1[2])
        ) {
          teacherIdx1 = idx;
        } else {
          teacherIdx2 = idx;
        }
        if (teacherIdx1 !== null && teacherIdx2 !== null) break;
      }
    }
    let temp = data[teacherIdx1][`f${floor1}`];
    data[teacherIdx1][`f${floor1}`] = data[teacherIdx2][`f${floor2}`];
    data[teacherIdx2][`f${floor2}`] = temp;
    const newWb = xlsx.utils.book_new();
    const newWs = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(newWb, newWs, "managerSchedule");
    xlsx.writeFile(
      newWb,
      path.join(__dirname, "../documents/managerSchedule.xlsx")
    );
  }
  res.status(200).json({});
});

router.get("/create/class", async (req, res) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      await Class.create({ grade: i + 1, class: j + 1 });
    }
  }
  res.json({});
});

router.get("/create/students", async (req, res) => {
  const wb = xlsx.readFile(path.join(__dirname, "../documents/students.xlsx"));
  const ws = wb.Sheets["students"];
  const data = xlsx.utils.sheet_to_json(ws);
  data.forEach(async (v) => {
    const c = await Class.findOne({
      where: { [Op.and]: [{ grade: v.grade }, { class: v.class }] },
    });
    await Student.create({
      name: v.name,
      number: v.number,
      classId: c.id,
      clubId: 1,
    });
  });
  res.json({});
});

router.get("/create/teachers", async (req, res) => {
  const wb = xlsx.readFile(path.join(__dirname, "../documents/teachers.xlsx"));
  const ws = wb.Sheets["teachers"];
  const data = xlsx.utils.sheet_to_json(ws);
  data.forEach(async (v) => {
    await Teacher.create({ name: v.teacher });
  });
  res.json({});
});

router.get("/create/clubs", async (req, res) => {
  const wb = xlsx.readFile(path.join(__dirname, "../documents/clubs.xlsx"));
  const ws = wb.Sheets["clubs"];
  const data = xlsx.utils.sheet_to_json(ws);
  data.forEach(async (v) => {
    await Club.create({ name: v.name, floor: v.floor });
  });
  res.json({});
});

module.exports = router;
