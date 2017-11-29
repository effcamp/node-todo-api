const { objectID } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/user')

// Todo.remove({}).then(result => {
//   console.log(result)
// })

// Todo.findOneAndRemove({_id: '5a1ed6ad042ec135d7f379fb'}).then(todo=>{})

Todo.findByIdAndRemove('5a1ed6ad042ec135d7f379fb').then(todo => {
  console.log(todo)
})
