const mongoose = require('mongoose')

const userModel = {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
}

const User = mongoose.model('User', userModel)

module.exports = { User }
