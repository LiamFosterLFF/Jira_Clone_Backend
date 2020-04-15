const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const Project = mongoose.model('project');

describe('Project controller', (done) => {
  it('Post to /api/projects creates a new project', (done) => {
    Project.countDocuments().then(count => {
      request(app)
      .post('/api/projects')
      .send({
        title: 'project 1',
        type: '1',
        abbreviation: 'p1',
        description: 'is a project'
      })
      .end((err, response) => {
        Project.countDocuments().then(newCount => {
          assert(count + 1 === newCount)
          assert(response.body.title === 'project 1')
          done();
      })
      });
    });

  });

  it('Get request to /api/projects sends all users info', (done) => {
    request(app)
      .post('/api/projects')
      .send({
        title: 'project 1',
        type: '1',
        abbreviation: 'p1',
        description: 'is a project'
      })
    .then(() => {
      request(app)
      .get('/api/projects')
      .end((err,response) => {
        assert(response.body[0].title === 'project 1')
        done();
      })
    })

  });

  it('Get request to /api/projects/:id sends a specific projects info', (done) => {
    request(app)
      .post('/api/projects')
      .send({
        title: 'project 2',
        type: '2',
        abbreviation: 'p2',
        description: 'is also a project'
      })
    .then((response) => {
      request(app)
      .get(`/api/projects/${response.body._id}`)
      .end((err,res) => {
        assert(response.body.title === 'project 2')
        done();
      })
    })

  });


  it("Put to /api/users updates a user's info", (done) => {
    request(app)
      .post('/api/projects')
      .send({
        title: 'project 2',
        type: '2',
        abbreviation: 'p2',
        description: 'is also also a project'
      })
      .then((response) => {
        request(app)
          .put(`/api/projects/${response.body._id}`)
          .then((res) => {
            assert(res.body.title === 'project 2')
            done()
          })
      })
  });

  it('Delete to /api/projects deletes a project', (done) => {
    request(app)
      .post('/api/projects')
      .send({
        title: 'project 3',
        type: '3',
        abbreviation: 'p3',
        description: 'is a third project'
      })
    .then((response) => {
      request(app)
        .delete(`/api/projects/${response.body._id}`)
        .then((res) => {
          assert(res.body.title === 'project 3')
          done()
        })
    })
  });

});
