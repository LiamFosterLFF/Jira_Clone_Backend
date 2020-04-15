const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const Issue = mongoose.model('issue');

describe('Issue controller', (done) => {
  it('Post to /api/issues creates a new issue', (done) => {
    Issue.countDocuments().then(count => {
      request(app)
      .post('/api/issues')
      .send({
        summary: 'is broken',
        description: 'just broke yo',
        type: 'issue',
        priority: '1'
      })
      .end((err, response) => {
        Issue.countDocuments().then(newCount => {
          assert(count + 1 === newCount)
          assert(response.body.summary === 'is broken')
          done();
      })
      });
    });

  });

  it('Get request to /api/issues sends all issues info', (done) => {
    request(app)
      .post('/api/issues')
      .send({
        summary: 'is broken',
        description: 'just broke yo',
        type: 'issue',
        priority: '1'
      })
    .then(() => {
      request(app)
      .get('/api/issues')
      .end((err,response) => {
        assert(response.body[0].summary === 'is broken')
        done();
      })
    })

  });

  it('Get request to /api/issues/:id sends a specific issues info', (done) => {
    request(app)
      .post('/api/issues')
      .send({
        summary: 'is also broken',
        description: 'so broke yo',
        type: 'issue',
        priority: '1'
      })
    .then((response) => {
      request(app)
      .get(`/api/issues/${response.body._id}`)
      .end((err,res) => {
        assert(response.body.summary === 'is also broken')
        done();
      })
    })

  });


  it("Put to /api/users updates a user's info", (done) => {
    request(app)
      .post('/api/issues')
      .send({
        summary: 'is still broken',
        description: 'just broke af yo',
        type: 'issue',
        priority: '1'
      })
      .then((response) => {
        request(app)
          .put(`/api/issues/${response.body._id}`)
          .then((res) => {
            assert(res.body.summary === 'is still broken')
            done()
          })
      })
  });

  it('Delete to /api/issues/id deletes an issue', (done) => {
    request(app)
      .post('/api/issues')
      .send({
        summary: 'is still broken',
        description: 'just whack yo',
        type: 'issue',
        priority: '1'
      })
    .then((response) => {
      request(app)
        .delete(`/api/issues/${response.body._id}`)
        .then((res) => {
          assert(res.body.summary === 'is still broken')
          done()
        })
    })
  });

});
