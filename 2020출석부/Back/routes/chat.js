const router = require('express').Router();
const { Chat, Teacher } = require('../models');

router.get('/', async (req, res) => {
  const chats = await Chat.findAll({
    include: [{ model: Teacher, required: true }]
  });
  res.status(200).json({ chats });
});

module.exports = router;