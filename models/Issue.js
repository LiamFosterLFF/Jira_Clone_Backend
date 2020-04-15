const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Issue = mongoose.model('issue', IssueSchema);

module.exports = Issue;
