const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const isLoggedIn = require('../utils/loginCheck');
const User = require('../models').User;

router.post('/login', async (req, res, next) => {
    const {username, password} = req.body;
    try {
        if(req.session.user) {
            const error = new Error('이미 로그인 됐음');
            error.status = 409;
            throw error;
        }
        const user = await User.findOne({where:{username}});
        if(!user || password !== user.password) {
            const error = new Error('username 또는 password가 잘못됌');
            error.status = 400;
            throw error;
        }
        req.session.user = {
            username,
            name: user.name,
            tablet: false
        }
        res.status(200).json({status: 200, message: '로그인 성공', user:req.session.user});
    } catch(err) {
        next(err);
    }
});

router.get('/tablet', isLoggedIn, (req, res) => {
    req.session.user.tablet = true;
    res.status(200).json({status: 200, message: '테블릿 모드로 전환됌'});
});

router.get('/mode-check', isLoggedIn, (req, res) => {
    res.status(200).json({status: 200, tablet: req.session.user.tablet});
});

router.delete('/logout', isLoggedIn, async (req, res) => {
    req.session.destroy();
    res.status(200).json({status: 200, message: '로그아웃 성공'});
});

module.exports = router;