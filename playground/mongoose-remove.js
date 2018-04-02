const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove('5abef66f805732462090c49a').then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('5abef66f805732462090c49a').then((todo) => {
  console.log(todo);
});


