const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  resetToken: String,
  resetTokenExpiry: Date,
}, { timestamps: true });

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.createResetToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.resetToken = token;
  this.resetTokenExpiry = Date.now() + 3600000;
  return token;
};

module.exports = mongoose.model('User', UserSchema);
