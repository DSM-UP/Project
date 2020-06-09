const router = require("express").Router();
const { Class, Student, Absence } = require("../models");
const jwtCheck = require("../middlewares/jwtCheck");

router.post("/:studentId", jwtCheck, async (req, res, next) => {
  const { reason, purpose, from, to } = req.body;
  const { studentId } = req.params;
  try {
    if (from > to) {
      const err = new Error("from이 to보다 과거여야 함");
      err.status = 400;
      throw err;
    }
    if (!purpose) {
      const err = new Error("purpose가 널이면 안됨");
      err.status = 402;
      throw err;
    }
    await Absence.create({
      reason,
      purpose,
      studentId,
      from,
      to,
    });
    res.status(200).json({});
  } catch (e) {
    next(e);
  }
});

router.get("/", jwtCheck, async (req, res, next) => {
  try {
    const absences = await Absence.findAll();
    res.status(200).json(absences);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
