require('dotenv').config();
const mongoose = require('mongoose');


// Task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 3,
      maxlength: 500,
    },
    subtasks: [
      {
        title: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        }
      }
    ],
    status: {
      type: String,
      enum: ["Todo", "Doing", "Done"],
      default: "Todo"
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
