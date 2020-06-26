const router = require("express").Router();
const { Chat, Teacher } = require("../models");
const jwtCheck = require("../middlewares/jwtCheck");

router.get("/", jwtCheck, async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      include: [{ model: Teacher, required: true }],
    });
    res.status(200).json({ chats });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
