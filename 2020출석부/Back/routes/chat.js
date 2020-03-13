const router = require('express').Router();
const { Chat } = require('../models');

router.get('/', async (req, res) => {
  const chats = await Chat.findAll();
  res.status(200).json({ chats });
});

module.exports = router;