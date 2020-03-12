const bcrypt = require('bcrypt-nodejs');

const a = bcrypt.hashSync('test', bcrypt.genSaltSync());

console.log(a);