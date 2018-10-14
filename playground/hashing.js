const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const password = '123abc!';
bcrypt.genSalt (10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

const hashPassword = '$2a$10$bLTAS.gGuMl3sL1eII2zVufqQtk50bAlSRNPYniNzQtxTNhLb.SG2';
bcrypt.compare(password, hashPassword, (err, result) => {
    console.log(result);
})
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