const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const User = mongoose.model('user');

describe('Users controller', () => {


  it('Post to /api/users creates a new user', (done) => {
    User.countDocuments().then(count => {

    request(app)
      .post('/api/users')
      .send({
        username: 'Joe',
        firstname: 'Joe',
        lastname: 'Malma',
        password: '123'
      })
      .end((err, response) => {
        User.countDocuments().then(newCount => {
          assert(count + 1 === newCount)
          assert(response.body.username === 'Joe')
          done();
      })
      });
    });

  });

  it('Get request to /api/users sends all users info', (done) => {
    request(app)
      .post('/api/users')
      .send({
        username: 'User',
        firstname: 'You',
        lastname: 'Sir',
        password: '123'
      })
    .then(() => {
      request(app)
      .get('/api/users')
      .end((err,response) => {
        assert(response.body[0].username === 'User')
        done();
      })
    })

  });

  it('Get request to /api/users/:id sends a specific users info', (done) => {
    request(app)
      .post('/api/users')
      .send({
        username: 'User',
        firstname: 'You',
        lastname: 'Sir',
        password: '123'
      })
    .then((response) => {
      request(app)
      .get(`/api/users/${response.body._id}`)
      .end((err,res) => {
        assert(response.body.username === 'User')
        done();
      })
    })

  });

  it("Put to /api/users updates a user's info", (done) => {
    request(app)
      .post('/api/users')
      .send({
        username: 'User',
        firstname: 'You',
        lastname: 'Sir',
        password: '123'
      })
      .then((response) => {
        request(app)
          .put(`/api/users/${response.body._id}`)
          .then((res) => {
            assert(res.body.username === 'User')
            done()
          })
      })
  });

  it('Delete to /api/users deletes a user', (done) => {
    request(app)
      .post('/api/users')
      .send({
        username: 'User',
        firstname: 'You',
        lastname: 'Sir',
        password: '123'
      })
    .then((response) => {
      request(app)
        .delete(`/api/users/${response.body._id}`)
        .then((res) => {
          assert(res.body.username === 'User')
          done()
        })
    })
  });

});
