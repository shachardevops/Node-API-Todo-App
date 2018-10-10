const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const id = '5bbdb521bffe064ac57ff0ac11';
const userId = '5bbd95de6f5b0a41fea110d3';
if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
    console.log(e);
})



// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id', todo);

// }).catch((err) => {
//     console.log();
// });

