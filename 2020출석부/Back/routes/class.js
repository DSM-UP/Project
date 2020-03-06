const router = require('express').Router();
const { Class } = require('../models');

router.get('/:floor', async (req, res, next) => {
  let { floor } = req.params;
  floor = Number(floor);
  const grade = floor === 4 ? 1 : floor === 3 ? 2 : floor === 2 ? 3 : null;
  try {
    const classes = await Class.findAll({ where: { grade } });
    res.status(200).json({ classes });
  } catch(e) {
    next(e);
  }
});

module.exports = router;