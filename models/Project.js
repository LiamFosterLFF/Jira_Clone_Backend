const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  issues: [{
    type: Schema.Types.ObjectId,
    ref: 'issue'
  }]
})

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
