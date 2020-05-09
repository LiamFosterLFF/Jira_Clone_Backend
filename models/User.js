const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'project'
  }]
})

const User = mongoose.model('user', UserSchema);

module.exports = User;
