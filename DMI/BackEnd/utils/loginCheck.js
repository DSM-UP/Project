module.exports = (req, res, next) => {
    try {
        if(!req.session.user) {
            req.session.destroy();
            const error = new Error('로그인 필요');
            error.status = 403;
            throw error;
        }
        req.user = req.session.user;
        next();
    } catch(err) {
        next(err);
    }
}