// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  // db
  //   .collection('Todos')
  //   .find({
  //     _id: new ObjectID('5a1dd0b3b743cb85fce83c88')
  //   })
  //   .toArray()
  //   .then(docs => {
  //     console.log('Todos')
  //     console.log(JSON.stringify(docs, undefined, 2))
  //   })
  //   .catch(err => console.log('Unable to fetch todos', err))

  // db
  //   .collection('Todos')
  //   .find()
  //   .count()
  //   .then(count => {
  //     console.log(`Todos count: ${count}`)
  //   })
  //   .catch(err => console.log('Unable to fetch todos', err))
  // db
  // .collection('Users')
  // .find({ name: 'Mike' })
  // .count()
  // .then(count => {
  //   console.log(`Todos count: ${count}`)
  // })
  db
    .collection('Users')
    .find({ name: 'Fred' })
    .toArray()
    .then(docs => {
      console.log(JSON.stringify(docs, undefined, 2))
    })

  // db.close()
})
