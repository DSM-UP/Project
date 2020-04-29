const router = require('express').Router();
const { Class, Student, Sequelize } = require('../models');
const { Op } = Sequelize;
const jwtCheck = require('../middlewares/jwtCheck');

router.get('/', jwtCheck, async (req, res, next) => {
  const { grade, classs } = req.query;
  try {
    const { id } = await Class.findOne({ where: { [Op.and]: [{ grade }, { class: classs }] }});
    const students = await Student.findAll({ where: { classId: id } });
    students.sort((a, b) => a.number - b.number)
    res.status(200).json({ students });
  } catch(e) {
    next(e);
  }
});

module.exports = router;