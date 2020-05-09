const assert = require('assert');
const User = require('../models/User');
const Project = require('../models/Project');
const Issue = require('../models/Issue');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({
      username: 'Joe',
      firstname: 'Joe',
      lastname: 'Malma',
      password: '123'
    });

    joe.save()
      .then(() => {
        assert(!joe.isNew);
        done();
      });
  });

  it('saves a project', (done) => {
    const project = new Project({
      title: 'project 1',
      type: '1',
      abbreviation: 'p1',
      description: 'is a project'
    });

    project.save()
      .then(() => {
        assert(!project.isNew);
        done();
      });
  });

  it('saves an issue', (done) => {
    const issue = new Issue({
      summary: 'is broken',
      description: 'just broke yo',
      type: 'issue',
      priority: '1'
    });

    issue.save()
      .then(() => {
        assert(!issue.isNew);
        done();
      });
  });

});
