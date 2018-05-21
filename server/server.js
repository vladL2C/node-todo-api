require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const {ObjectID} = require('mongodb');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({todos});
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// Get /todos/:id

app.get('/todos/:id', (req, res) => {
  const {id} = req.params;

  if (!ObjectID.isValid(id)) res.status(404).send();

  Todo.findById(id)
    .then(todo => {
      if (!todo) res.status(404).send(); // same line return
      res.send({todo});
    })
    .catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  const {id} = req.params;

  if (!ObjectID.isValid(id)) res.status(404).send();

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) res.status(404).send();
      res.send({todo});
    })
    .catch(e => res.status(400).send());
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);
  user
    .save()
    .then(() => user.generateAuthToken())
    .then(token => res.header('x-auth', token).send(user))
    .catch(e => res.status(404).send(e));
});

app.patch('/todos/:id', (req, res) => {
  const {id} = req.params;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) res.status(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      return res.send({todo});
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then(user =>
      user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      })
    )
    .catch(e => res.status(400).send());
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
