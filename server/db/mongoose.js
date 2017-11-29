// .\mongod.exe --dbpath C:\code\mongo-data\ --start server
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp', { useMongoClient: true })

module.exports = { mongoose }
