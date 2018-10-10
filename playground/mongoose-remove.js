const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
    console.log(result);
})
Todo.findById('5bbde6752f5092a7dcfc8710').then((todo) => {
    console.log(todo);
})