// npm init for initial setup
// use npm run ... to run the custom scripts    

// console.log('Hello World!');

const validator = require('validator');
console.log(validator.isEmail('foo@bar.com'));
console.log(validator.isMobilePhone('081234567891', 'id-ID'))