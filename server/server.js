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

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });
  
    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });
  app.get('/todos', authenticate, (req, res) => {
    Todo.find({
      _creator: req.user._id
    }).then((todos) => {
      res.send({todos});
    }, (e) => {
      res.status(400).send(e);
    });
  });
app.get('/todos/:id', authenticate,(request, response) => {
    const id = request.params.id;
    if(!ObjectID.isValid(id)){
       return response.status(404).send();
    }
    Todo.findOne({
        _id:id,
        _creator:request.user._id
    }).then((todo) => {
        if (!todo) {
          return response.status(404).send();
        }
        response.send({todo});
    }).catch((e) => {
        response.status(400).send();
    });

    
});
app.delete('/todos/:id', authenticate,(request, response) => {
    const id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }
    Todo.findOneAndRemove({
        _id:id, 
        _creator:user._id
    }).then((todo) => {
        if (!todo) {
            return response.status(404).send();
        }
        response.send(todo);
    }).catch((e) => {
        response.status(400).send();
    })
});
app.patch('/todos/:id', authenticate,(request, response) => {
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
    Todo.findOneAndUpdate({
        _id:id,
        _creator:user._id
    },{$set:body},
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
  