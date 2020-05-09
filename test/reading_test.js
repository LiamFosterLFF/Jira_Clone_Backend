const assert = require('assert');
const User = require('../models/User');

describe('Reading users out of the database', () => {
  let joe;
  
  beforeEach((done) => {
    joe = new User({
      username: 'Joe',
      firstname: 'Joe',
      lastname: 'Malma',
      password: '123'
    });

    joe.save()
      .then(() =>  done() );
  });

  it('finds all users with a username of joe', (done) => {
    User.find({ username: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done();
      });
  });

  it('finds a user with a particular id', (done) => {
    User.findOne({ username: 'Joe' })
      .then((user) => {
        assert(user.username === 'Joe');
        done();
      })
  });
});
