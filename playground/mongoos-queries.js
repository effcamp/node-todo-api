const { objectID } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/user')

// const id = '5a1e924f96c8424644875ce5';

// if (!ObjectId.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({ _id: id }).then(todos => {
//   console.log('Todos', todos);
// });

// Todo.findOne({ _id: id }).then(todo => {
//   console.log('Todo', todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('ID not found');
//     }
//     console.log('Todo by ID', todo);
//   })
//   .catch(e => console.log(e));

const idUser = '5a1df4a979df531890732904'

User.findById(idUser)
  .then(user => {
    if (!user) {
      return console.log('No user with that ID found')
    }
    console.log('User by ID', user)
  })
  .catch(e => {
    console.log(e)
  })
