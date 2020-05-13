const mongoose = require('mongoose');
const CommentSchema = require('./Comment');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  issueType: {
    type: String,
    required: true
  },
  issueTitle: {
    type: String,
    required: true
  },
  issueDescription: {
    type: String,
    required: true
  }, 
  issuePriority: {
    type: String,
    required: true
  },
  issueEstimatedTime: {
    type: String,
  },
  issueTimeLogged: {
    type: String,
  },
  issueStatus: {
    type: String,
  },
  issueComments: [CommentSchema],
  issueReportingUser: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  issueAssignedUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
})

const Issue = mongoose.model('issue', IssueSchema);

module.exports = Issue;
// issueType: { name: "Bug" },
//                         issueTitle: { value: "Finish modal structure, so it looks right." },
//                         issueDescription: { value: 'Try assigning Pickle Rick to this issue. 🥒 🥒 🥒' },
//                         issueComments: [{ user: { username: "Lord Gaben", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, date: "3 days ago", text: "In the moonlight, The color and scent of the wisteria Seems far away." }],
//                         issueEstimatedTime: {value: 6},
//                         issueStatus: {name: "backlog"},
//                         issuePriority: { name: "High" },
//                         issueReportingUser: { name: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" },
//                         issueAssignedUsers: { names: ["Baby Yoda", "Pickle Rick"] }