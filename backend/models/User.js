const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


mongoose.connect(process.env.MONGODB_URI, {}).then(
    () => {
        console.log('Connected to the database');
    }
).catch(
    (err)=>{
        console.log('Failed to connect to the database', err);
    }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: {
      type : String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    Tasks : [{type : mongoose.Schema.Types.ObjectId ,ref : 'Tasks'}],
    Boards:[{type : mongoose.Schema.Types.ObjectId, ref  : 'Board',}]
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('User', userSchema);
