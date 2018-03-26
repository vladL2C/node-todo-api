var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

// var newUser = new User({
//   email: 'vlad@example.com'
// });

// newUser.save().then((doc) => {
//   console.log('Saved',doc);
// }, (err) => {
//   console.log('unable to save', err);
// });

module.exports = { User };