// const  MongoClient = require('mongodb').MongoClient;
const  {MongoClient, ObjectID} = require('mongodb');
let obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if (err) {
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB serer');
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });


    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result) => {
    //     console.log(result);
    // })

    // db.collection('Todos').findOneAndDelete({complited:false}).then((result) => {
    //     console.log(result);
    // })
    db.collection('Users').deleteMany({name:"Mike"});
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5bbc7d4253736a3308f34f59')}
).then((result) => {
    console.log(JSON.stringify(result,undefined,2));
});
    //db.close();
});