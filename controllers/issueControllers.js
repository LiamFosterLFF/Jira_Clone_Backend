const Issue = require('../models/Issue')
const Project = require('../models/Project')
const User = require('../models/User')

module.exports = {
  createIssue(req, res) {
    Project.findById(req.body.issueData.project)
    .then((project) => {
      Issue.create(req.body.issueData).then(issue =>{
        User.find({}, function(err, userDocs) {
          userDocs.forEach(userDoc => {
            if (userDoc.username === req.body.users.issueReportingUser.username) {
              issue.issueReportingUser = userDoc
            }
            req.body.users.issueAssignedUsers.forEach(assignedUser => {
              if (assignedUser.username === userDoc.username) {
                issue.issueAssignedUsers.push(userDoc)
              }
            })
            
          })
          issue.save()
        })
        .then(() => {
          project.issues.push(issue)
          project.save()
          res.send(issue)
        })

      })
    })
  },

  getIssues(req, res) {
    Issue.find({})
      .populate({path: 'issueReportingUser'})
      .populate({path: 'issueAssignedUsers'})
      .then((issues) => res.send(issues))
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
