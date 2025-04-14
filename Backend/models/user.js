

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
    grade: { type: String, enum: ['N/A', 'Grade 10', 'Grade 11', 'Grade 12'], default: 'N/A' },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null }
});

// for RESET PASS:

// hash password before saving

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model('User', UserSchema);
