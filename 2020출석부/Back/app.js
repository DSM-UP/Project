const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models');
const path = require('path');
const scheduler = require('./utils/schedule');
const socket = require('./socket');
require('dotenv').config();

const app = express();
sequelize.sync();
const schedule = scheduler();

app.use('/', express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}
app.use(cors());

app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));
app.use('/attendance', require('./routes/attendance'));
app.use('/student', require('./routes/student'));
app.use('/absence', require('./routes/absence'));
app.use('/club', require('./routes/club'));
app.use('/class', require('./routes/class'));
app.use('/chat', require('./routes/chat'));
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ status: err.status, message: err.message });
});

const server = app.listen(app.get('port'), () => console.log(`port : ${app.get('port')}`));

socket(server, app);

module.exports = app;