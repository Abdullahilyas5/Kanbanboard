const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title : {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
      maxlength: 50,
    },
    description : {
      type: String,
      required: [true, "Description is required"],
      minlength: 3,
      maxlength: 500,
    },
    subtask :[{
        title : {
            type : String,
            required : true,
        },
        completed : {
            type : Boolean,
            default : false
        }
    }],
    board : {type : mongoose.Schema.Types.ObjectId, ref : 'Board'},
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
