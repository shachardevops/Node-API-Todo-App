const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');



const app = express();
const port = process.env.PORT|| 3000;
app.use(bodyParser.json());

app.post('/todos', (request, response) => {
    let todo = new Todo({
        text: request.body.text
    });

    todo.save().then((doc) => {
        response.send(doc);
    }).catch((error) => {
        response.status(400).send(error);
    })

});
app.get('/todos',(request, response) => {
    Todo.find().then((todos) => {
        response.send({
            todos
        });
    }).catch((err) => {
       response.status(400).send(err);
    })
});
app.get('/todos/:id', (request, response) => {
    const id = request.params.id;
    if(!ObjectID.isValid(id)){
       return response.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
          return response.status(404).send();
        }
        response.send({todo});
    }).catch((e) => {
        response.status(400).send();
    });

    
});
app.delete('/todos/:id', (request, response) => {
    const id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.send(todo);
    }).catch((e) => {
        response.status(400).send();
    })
})
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});