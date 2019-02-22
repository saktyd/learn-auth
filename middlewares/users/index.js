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
module.exports = {
  register: async (req, res) => {
    res.send({
      message: 'Register'
    })
  },

  login: async (req, res) => {
    res.send({
      message: 'Login'
    })
  },

  getAllUsers: async (req, res) => {
    res.send({
      message: 'Get all users'
    })
  },

  getProfile: async (req, res) => {
    res.send({
      message: 'Get my profile'
    })
  }
}
