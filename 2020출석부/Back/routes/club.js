const router = require('express').Router();
const { Club } = require('../models');

router.get('/:floor', async (req, res, next) => {
  const { floor } = req.params;
  try {
    const clubs = await Club.findAll({ where: { floor } });
    console.log(clubs);
    res.status(200).json({ clubs });
  } catch(e) {
    next(e);
  }
});

router.get('/:clubId/students', async (req, res, next) => {
  
});

module.exports = router;