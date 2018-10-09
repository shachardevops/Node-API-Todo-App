// const  MongoClient = require('mongodb').MongoClient;
const  {MongoClient, ObjectID} = require('mongodb');
let obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if (err) {
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB serer');
    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed: false
    // },(err, result) => {
    //     if (err) {
    //        return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name:'Shachar',
    //     age: 21,
    //     location: 'Tel Aviv'
    // },(err,result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // })
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    },(err) => {
        console.log('Unable to fetch todos', err);
    });
    db.close();
});