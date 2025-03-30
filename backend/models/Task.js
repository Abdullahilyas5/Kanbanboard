require('dotenv').config();
const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(
    () => {
        console.log('Connected to the database');
    }
).catch(
    (err)=>{
        console.log('Failed to connect to the database', err);
    }
);

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
