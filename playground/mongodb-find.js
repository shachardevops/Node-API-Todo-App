// const  MongoClient = require('mongodb').MongoClient;
const  {MongoClient, ObjectID} = require('mongodb');
let obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if (err) {
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB serer');
   
    // db.collection('Todos').find({
    //     _id: new ObjectID('5bbc7c292c403d33026d8327')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // },(err) => {
    //     console.log('Unable to fetch todos', err);
    // });


    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
        console.log(JSON.stringify(docs, undefined, 2));
    },(err) => {
        console.log('Unable to fetch todos', err);
    });


    // db.collection('Users').find({name:'Shachar'}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2));
    // }).catch((err)=>{
    //     console.log(err);
    // })

    //db.close();
});