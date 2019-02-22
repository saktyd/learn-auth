//EXPRESS
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.json())

// MONGOOSE
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

const Users = mongoose.model('User', {
  name: String,
  age: Number,
  email: String
})

// Get hello
app.get('/', (req, res) => {
  res.send({
    message: 'Hello World'
  })
})

// Get list of users
app.get('/users', async (req, res) => {
  res.send({
    message: 'List of all user',
    users: await Users.find()
  })
})

// Create new user
app.post('/users', async (req, res) => {
  if (req.body.name) {
    const newUser = new Users({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      birthDate: req.body.birthDate
    })

    await newUser.save()
    res.send({
      message: 'Created new user',
      newUser: newUser
    })
  }
})

// Delete all users
app.delete('/users', async (req, res) => {
  res.send({
    message: 'All users has been deleted',
    Users: await Users.deleteMany()
  })
})

app.delete(`/users/:id`, async (req, res) => {
  const id = req.params.id

  res.send({
    message: 'One user has been deleted',
    Users: await Users.deleteOne({ _id: id })
  })
})

app.listen(port, () => {
  console.log(`Express app is running on localhost:${port}`)
})
