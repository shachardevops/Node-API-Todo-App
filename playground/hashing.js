const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const validator = require('validator');
console.log(validator.isEmail('shahargmail.com'));

// let data = {
//     id:10
// };

// const token = jwt.sign(data, '123abc');
// console.log(token);
// const decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// let message = 'I am user number 3';
// const hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`)
// let data = {
//     id: 4
// };
// const token = {
//     data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// }
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not change');
// }else{
//     console.log('Data was changed. Do not trust!');
// }