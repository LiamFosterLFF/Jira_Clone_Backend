const assert = require('assert');
const User = require('../models/User');

describe('Updating users from the database', () => {
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

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].username === 'Alex')
        done();
      })
  }

  it('instance type using set and save', (done) => {
    joe.set('username', 'Alex')
    assertName(joe.save(), done)


  });

  it('A model instance can update', (done) => {
    assertName(joe.updateOne({ username: 'Alex' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.updateOne({ username: 'Joe' }, { username: 'Alex' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ username: 'Joe' }, { username: 'Alex' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { username: 'Alex' }),
      done
    );
  });
});
