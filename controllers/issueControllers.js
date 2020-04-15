const Issue = require('../models/Issue')
const Project = require('../models/Project')

module.exports = {

  createIssue(req, res) {
    const issueProps = req.body;
    Project.findById(req.body.project)
    .then((project) => {
      Issue.create(issueProps).then(issue =>{
        project.issues.push(issue)
        console.log(issue);
        project.save()
        res.send(issue)
        })
      })
  },

  getIssues(req, res) {
    Issue.find({}, function(err,issues) {res.send(issues)});
  },

  getSingleIssue(req, res) {
    Issue.findById(req.params.id, function(err,issue) {res.send(issue)});
  },

  updateIssue(req, res, next) {
    Issue.findByIdAndUpdate(req.params.id, req.body)
    .then(project => {
      res.send(project)
    })
    .catch(next)
  },

  removeIssue(req, res, next) {
    Issue.findByIdAndRemove({ _id: req.params.id })
    .then(issue => {
      res.send(issue)
    })
    .catch(next)
  }

};
