const router = require('express').Router();
const { Class, Student, Absence } = require('../models');

router.post('/:studentId', async (req, res, next) => {
  const { reason, purpose, from, to } = req.body;
  const { studentId } = req.params;
  try {
    if (from > to) {
      const err = new Error('from이 to보다 과거여야 함');
      err.status = 400;
      throw err;
    }
    await Absence.create({
      reason, purpose, studentId, from, to
    });
    res.status(200).json({});
  } catch(e) {
    next(e);
  }
});

module.exports = router;