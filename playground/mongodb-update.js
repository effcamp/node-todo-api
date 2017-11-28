// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  // db
  //   .collection('Todos')
  //   .findOneAndUpdate(
  //     {
  //       _id: new ObjectID('5a1dda4db743cb85fce84045')
  //     },
  //     {
  //       $set: {
  //         completed: true
  //       }
  //     },
  //     {
  //       returnOriginal: false
  //     }
  //   )
  //   .then(res => console.log(res))

  db
    .collection('Users')
    .findOneAndUpdate(
      {
        _id: new ObjectID('5a1dcd3c9baa0f2a00e4ff21')
      },
      {
        $set: {
          name: 'Fred'
        },
        $inc: {
          age: 1
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(res => console.log(res))

  // db.close()
})

// UPDATE OPERATORS //////////////////////////////////
