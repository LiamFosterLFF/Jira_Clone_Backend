const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/User');
const Project = require('../models/Project');
const Issue = require('../models/Issue');

describe('Associations', (done) => {
  let user, project, issue;
  beforeEach((done) => {
    user = new User({
      username: 'User',
      firstname: 'You',
      lastname: 'Sir',
      password: '123'
    });

    project = new Project({
      title: 'project 1',
      type: '1',
      abbreviation: 'p1',
      description: 'is a project'
    });

    issue = new Issue({
      summary: 'is broken',
      description: 'just broke yo',
      type: 'issue',
      priority: '1'
    });

    user.projects.push(project);
    project.issues.push(issue);
    issue.user = user;

    Promise.all([user.save(), project.save(), issue.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) =>{
    User.findOne({ username: 'User' })
      .populate('projects')
      .then((user) => {
        assert(user.projects[0].title='project 1');
        done();
      });
  });

  it('saves a full relation graph', (done) =>{
    User.findOne({ username: 'User' })
      .populate({
        path: 'projects',
        populate: {
          path: 'issues',
          model: 'issue',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.username === 'User');
        assert(user.projects[0].title === 'project 1');
        assert(user.projects[0].issues[0].summary === 'is broken');
        assert(user.projects[0].issues[0].user.username === 'User')
        done();
      });
  });
});
