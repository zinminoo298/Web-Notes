const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
});

userSchema.statics.findAndValidate = async function (username, password) {
  const foundUser = await this.findOne({ username });
  if (foundUser) {
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
  } else return false;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
