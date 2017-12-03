const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let password = '123abc!'
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash)
//   })
// })

const hashedPassword =
  '$2a$10$wGKcxIW.ep7LsE419/QIFOS9MRhz0fNfkVHTnoU/M/S3gPtdfoi56'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
})

// const data = {
//   id: 10
// }
// const token = jwt.sign(data, '123abc')
// console.log(token)

// const decoded = jwt.verify(token, '123abc')
// console.log(`Decoded`, decoded)

// const message = 'I am user number 3'

// const hash = SHA256(message).toString()

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// const data = {
//   id: 4
// }
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

// if (resultHash === token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('data was changed, DO NOT TRUST')
// }
