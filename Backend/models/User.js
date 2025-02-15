const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//to create a user schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },//store the user's email which must be unique
  password: { type: String, required: true },//store the user's hashed pass
});
