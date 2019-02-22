// MONGOOSE
require('dotenv').config()
const mongoose = require('mongoose')
const helpers = require('../../helpers')

mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

const User = mongoose.model('User', {
  name: String,
  age: Number,
  email: String,
  salt: String,
  password: String
})

module.exports = {
  register: async (req, res) => {
    const { salt, hashedPassword } = await helpers.encryptPassword(
      req.body.password
    )

    if (req.body.name) {
      const newUser = new User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        salt: salt,
        password: hashedPassword
      })

      const result = await newUser.save()
      res.send({
        message: 'Register',
        newUser: newUser,
        result: result
      })
    }
  },

  login: async (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    }

    res.send({
      message: 'Login',
      user: user
    })
  },

  getAllUsers: async (req, res) => {
    res.send({
      message: 'Get all users',
      users: await User.find({}, { salt: 0, password: 0 })
    })
  },

  getProfile: async (req, res) => {
    res.send({
      message: 'Get my profile'
    })
  }
}
