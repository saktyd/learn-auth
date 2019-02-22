// MONGOOSE
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

const User = mongoose.model('User', {
  name: String,
  age: Number,
  email: String
})

module.exports = {
  register: async (req, res) => {
    if (req.body.name) {
      const newUser = new User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
      })

      await newUser.save()
      res.send({
        message: 'Created new user',
        newUser: newUser
      })
    }
  },

  login: async (req, res) => {
    res.send({
      message: 'Login'
    })
  },

  getAllUsers: async (req, res) => {
    res.send({
      message: 'Get all users',
      users: await User.find()
    })
  },

  getProfile: async (req, res) => {
    res.send({
      message: 'Get my profile'
    })
  }
}
