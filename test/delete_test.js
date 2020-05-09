const assert = require('assert');
const User = require('../models/User');

describe('Deleting users out of the database', () => {
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

  it('joe exists in database', (done) => {
    User.find({ username: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done();
      });
  })

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ username: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method remove', (done) => {
    User.deleteMany({ username: 'Joe' })
      .then(() => User.findOne({ username: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ username: 'Joe' })
      .then(() => User.findOne({ username: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ username: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });
});
