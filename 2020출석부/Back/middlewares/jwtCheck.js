const jwt = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const token = req.get('accessToken');
    req.decoded = await jwt.verify(token);
    next();
  } catch (e) {
    next(e);
  }
}