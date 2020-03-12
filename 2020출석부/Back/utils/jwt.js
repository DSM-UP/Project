const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS = 'ACCESS';
const REFRESH = 'REFRESH';
const BEFORE = 'BEFORE';

exports.generateBeforeToken = async () => {
  try {
    const token = await jwt.sign(
      {},
      process.env.JWT_B,
      { expiresIn: '5m', subject: BEFORE }
    );
    return token;
  } catch(e) {
    throw e;
  }
};

exports.generateToken = async (floor, name, sub) => {
  try {
    const token = await jwt.sign(
      { floor, name },
      process.env.JWT,
      { expiresIn: sub === ACCESS ? '2h' : sub === REFRESH ? '1d' : '0', subject: sub }
    );
    return token;
  } catch(e) {
    throw e;
  }
};

exports.verifyBefore = async (token) => {
  try {
    const verified = await jwt.verify(token, process.env.JWT_B);
    if (verified.sub !== BEFORE) {
      throw new Error('유효하지 않은 토큰');
    }
    return verified;
  } catch(e) {
    let err;
    if (e.name === 'TokenExpiredError') {
      err = new Error('토큰 유효기간 만료');
      err.status = 403;
    } else {
      err = new Error('유효하지 않은 토큰');
      err.status = 401;
    }
    throw err;
  }
}

exports.verify = async (token) => {
  try {
    const verified = await jwt.verify(token, process.env.JWT);
    if (verified.sub !== ACCESS && verified.sub !== REFRESH) {
      throw new Error('유효하지 않은 토큰');
    }
    return verified;
  } catch(e) {
    let err;
    if (e.name === 'TokenExpiredError') {
      err = new Error('토큰 유효기간 만료');
      err.status = 403;
    } else {
      err = new Error('유효하지 않은 토큰');
      err.status = 401;
    }
    throw err;
  }
}

exports.ACCESS = ACCESS;
exports.REFRESH = REFRESH;