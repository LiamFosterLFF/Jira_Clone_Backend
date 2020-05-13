const userControllers = require('../controllers/userControllers');
const projectControllers = require('../controllers/projectControllers');
const issueControllers = require('../controllers/issueControllers');


module.exports = (app) => {
  app.get('/api', userControllers.greeting)

  app.get('/api/users', userControllers.getUsers);
  app.get('/api/projects', projectControllers.getProjects);
  app.get('/api/issues', issueControllers.getIssues);

  app.get('/api/users/:id', userControllers.getSingleUser);
  app.get('/api/projects/:id', projectControllers.getSingleProject);
  app.get('/api/issues/:id', issueControllers.getSingleIssue);

  app.post('/api/users', userControllers.createUser)
  app.post('/api/projects', projectControllers.createProject)
  app.post('/api/issues', issueControllers.createIssue)

  app.put('/api/users/:id', userControllers.updateUser)
  app.put('/api/projects/:id', projectControllers.updateProject)
  app.put('/api/issues/:id', issueControllers.updateSingleIssue)
  // app.put('/api/issues', issueControllers.updateMultipleIssues)

  app.delete('/api/users/:id', userControllers.removeUser)
  app.delete('/api/projects/:id', projectControllers.removeProject)
  app.delete('/api/issues/:id', issueControllers.removeIssue)
};
