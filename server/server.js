const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');


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
});
app.patch('/todos/:id',(request, response) => {
    const id = request.params.id;
    let body = _.pick(request.body,['text','completed']);
    
    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    if (_.isBoolean(body.completed)&& body.completed) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set:body},
    {new: true}
    ).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.send({todo});
    }).catch((e) => {
        response.status(400).send();
    })
})
app.get('/users/me', authenticate,(request, response) => {
        response.send(request.user);
    });
// POST /users
app.post('/users', (request, res) => {
    const body = _.pick(request.body, ['email', 'password']);
    const user = new User(body);
  
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
  });
  app.post('/users/login', (request, response) => {
    const body = _.pick(request.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            response.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        response.status(400).send();
    });
  })
  app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
  });
  
  app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  