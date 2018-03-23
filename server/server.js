var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo')
// });

// var anotherTodo = new Todo({
//   text: ' edit this video '
// });

// anotherTodo.save().then((doc) => {
//   console.log('Saved', doc);
// }, (e) => {
//   console.log('Unable to save todo',e);
// });

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var newUser = new User({
  email: 'vlad@example.com'
});

newUser.save().then((doc) => {
  console.log('Saved',doc);
}, (err) => {
  console.log('unable to save', err);
});




