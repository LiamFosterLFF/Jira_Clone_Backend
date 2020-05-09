const Project = require('../models/Project')

module.exports = {

  createProject(req, res) {
    const projectProps = req.body;
    Project.create(projectProps)
      .then(project => res.send(project))
  },

  getProjects(req, res) {
    Project.find({}, function(err,projects) {res.send(projects)});
  },

  getSingleProject(req, res) {
    Project.findById(req.params.id, function(err,project) {res.send(project)});
  },

  updateProject(req, res, next) {
    Project.findByIdAndUpdate(req.params.id , req.body)
    .then(project => {
      res.send(project)
    })
    .catch(next)
  },

  removeProject(req, res, next) {
    Project.findByIdAndRemove({ _id: req.params.id })
    .then(project => {
      res.send(project)
    })
    .catch(next)
  }

};
