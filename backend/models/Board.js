const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title : {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
      maxlength: 50,
    },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
      tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Board', boardSchema);
