const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//to create a user schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },//store the user's email which must be unique
  password: { type: String, required: true },//store the user's hashed pass
});
//hash password before saving for security reasons using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });