const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// var id = '5abab2d155dddaba3e70e41911';
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

var id = '5ab474fa9a234520154adad199';

if (!ObjectID.isValid(id)) console.log('ID not valid');

User.findById(id).then((user) => {
  if (!user) return console.log('ID not found');

  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => (console.log(e)));