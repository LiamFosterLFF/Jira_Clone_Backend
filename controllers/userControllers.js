const User = require('../models/User')

module.exports = {

  greeting(req, res) {
    res.send({hi: 'there'})
  },

  createUser(req, res) {
    const userProps = req.body;

    User.create(userProps)
      .then(user => res.send(user))
  },

  getUsers(req, res) {
    User.find({}, function(err,users) {res.send(users)});
  },

  getSingleUser(req, res) {
    User.findById({_id: req.params.id}, function(err,user) {res.send(user)});
  },

  updateUser(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      res.send(user)
    })
    .catch(next)
  },

  removeUser(req, res, next) {
    User.findByIdAndRemove({ _id: req.params.id })
    .then(user => {
      res.send(user)
    })
    .catch(next)
  }

};
