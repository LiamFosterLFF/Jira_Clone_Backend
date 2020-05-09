const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})


module.exports = CommentSchema;
// { user: { username: "Lord Gaben", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, 
// date: "3 days ago", 
// text: "In the moonlight, The color and scent of the wisteria Seems far away." 
// }