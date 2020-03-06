const jwt = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const token = req.get('beforeToken');
    await jwt.verifyBefore(token);
    next();
  } catch(e) {
    next(e);
  }
}