const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "public"],
    default: "public"
  }
});

userSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 12);

  this.password = hash;

  next();
});

module.exports = mongoose.model("User", userSchema);
