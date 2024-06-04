const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/examace")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UsersModel = mongoose.model("users", UserSchema);

module.exports = UsersModel;
