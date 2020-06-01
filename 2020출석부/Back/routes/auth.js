const router = require("express").Router();
const bcrypt = require("bcrypt-nodejs");
const beforeCheck = require("../middlewares/beforeCheck");
const jwtCheck = require("../middlewares/jwtCheck");
const jwt = require("../utils/jwt");
const { User } = require("../models");

router.post("/signin", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      const err = new Error("로그인 정보가 잘못됨");
      err.status = 400;
      throw err;
    }
    const beforeToken = await jwt.generateBeforeToken();
    res.status(200).json({ beforeToken });
  } catch (e) {
    next(e);
  }
});

router.post("/signin-pc", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      const err = new Error("로그인 정보가 잘못됨");
      err.status = 400;
      throw err;
    }
    const accessToken = await jwt.generateToken(-1, "user", jwt.ACCESS);
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
});

router.post("/floor-decision", beforeCheck, async (req, res, next) => {
  const { floor, name } = req.body;
  try {
    const accessToken = await jwt.generateToken(floor, name, jwt.ACCESS);
    //const refreshToken = await jwt.generateToken(floor, name, jwt.REFRESH);
    res.status(200).json({ accessToken });
  } catch (e) {
    next(e);
  }
});

router.get("/access-check", jwtCheck, async (req, res, next) => {
  res.status(200).json({ user: req.decoded });
});

router.get("/before-check", beforeCheck, (req, res) => {
  res.status(200).json();
});

// router.get('/refresh', async (req, res, next) => {
//   const refreshToken = req.get('refreshToken');
//   try {
//     const user = await jwt.verify(refreshToken);
//     const accessToken = await jwt.generateToken(user.floor, user.name, jwt.ACCESS);
//     const refreshTok = await jwt.generateToken(user.floor, user.name, jwt.REFRESH);
//     res.status(200).json({ accessToken, refreshToken: refreshTok, user });
//   } catch(e) {
//     next(e);
//   }
// });

module.exports = router;
