const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
    // db.collection('Todos').findOneAndUpdate({
    //   _id: new ObjectID("5ab07547111f88f4acf753c5")
    // }, {
    //   $set: {
    //     completed: true
    //   }
    // }, {
    //   returnOriginal: false
    // }).then((result) => {
    //   console.log(result);
    // });

    // db.collection('Users').findOneAndUpdate({
    //   _id: new ObjectID("5aa736047a97e5d13f3db785")
    // }, {
    //   $set: {
    //     name: 'Vlad'
    //   },
    //   $inc: {
    //     age: 1
    //   }
    // }, {
    //   returnOriginal: false
    // }).then((result) => {
    //   console.log(result);
    // });

   //db.close();
 });