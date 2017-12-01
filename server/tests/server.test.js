const request = require('supertest')
const expect = require('expect')
const { ObjectID } = require('mongodb')

const { app } = require('../server')
const { Todo } = require('../models/todo')
// const { User } = require('../models/user')

const todos = [
  { _id: new ObjectID(), text: 'First test todo' },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }
]

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos)
    })
    .then(() => done())
})

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done()
          })
          .catch(e => done(e))
      })
  })

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2)
            done()
          })
          .catch(e => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })
  it('should return 404 if todo not found', done => {
    const id = new ObjectID().toHexString() //real ID but not in test-todos
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 for non-object ids', done => {
    request(app)
      .get(`/todos/123abc`)
      .expect(404)
      .end(done)
  })
})
describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    const hexID = todos[1]._id.toHexString()
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexID)
        // expect(res.body.todos.length).toBe(1)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.findById(hexID)
          .then(todo => {
            expect(todo).toNotExist()
            done()
          })
          .catch(e => done(e))
      })
  })
  it('should return 404 if todo not found', done => {
    const id = new ObjectID().toHexString() //real ID but not in test-todos
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done)
  })
  it('should return 404 if object id is invalid', done => {
    request(app)
      .delete(`/todos/123abc`)
      .expect(404)
      .end(done)
  })
})
describe('PATCH /todos/:id', () => {
  it('should update a todo', done => {
    const hexID = todos[1]._id.toHexString()
    const text = 'This is something'
    const completed = true
    request(app)
      .patch(`/todos/${hexID}`)
      .send({ text, completed })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end(done)
  })
  it('should clear completed at when todo is not completed', done => {
    const hexID = todos[1]._id.toHexString()
    const text = 'This is something else'
    const completed = false
    request(app)
      .patch(`/todos/${hexID}`)
      .send({ text, completed })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)
  })
  // it('should return 404 if todo not found', done => {
  //   const id = new ObjectID().toHexString() //real ID but not in test-todos
  //   request(app)
  //     .patch(`/todos/${id}`)
  //     .expect(404)
  //     .end(done)
  // })
  // it('should return 404 if todo is invalid', done => {
  //   request(app)
  //     .patch(`/todos/123abc`)
  //     .expect(404)
  //     .end(done)
  // })
})
