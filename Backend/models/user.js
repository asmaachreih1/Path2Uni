

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //role: { type: String, enum: ['Student', 'Mentor'], default: 'Student' },
    role: { type: String, enum: ['N/A', 'Student', 'Mentor'], default: 'Student' },
    isAdmin: { type: Boolean, default: false },//new
    grade: { type: String, enum: ['N/A', 'Grade 10', 'Grade 11', 'Grade 12'], default: 'N/A' },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null }
});

// Enforce that a user cannot be both an admin and have a role
UserSchema.pre('save', function (next) {
    if (this.isAdmin && this.role !== 'N/A') {
        return next(new Error('Admin cannot have a user role'));
    }
    if (!this.isAdmin && this.role === 'N/A') {
        return next(new Error('User must have a valid role'));
    }
    next();
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
