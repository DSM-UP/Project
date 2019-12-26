const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const sequelize = require('./models').sequelize;
const hpp = require('hpp');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const scheduler = require('./utils/schedule');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
require('dotenv').config();

const app = express();
sequelize.sync();
const schedule = scheduler();

const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const options = {
    host: config.host,
    port: process.env.PORT,
    user: config.username,
    password: config.password,
    database: config.database
};
const sessionStore = new MySQLStore(options);

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
if(process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet());
} else {
    app.use(morgan('dev'));
}
app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));
app.use(cors());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({status: err.status, message: err.message});
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트`);
});