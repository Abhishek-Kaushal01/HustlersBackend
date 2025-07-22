const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Helper to sign JWT and send response
const sendToken = (user, res, status = 200) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
  res.status(status).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const user = await User.create({ name, email, password });
    sendToken(user, res, 201);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    sendToken(user, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save({ validateBeforeSave: false });
    // Send email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `<p>You requested a password reset.</p><p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 1 hour.</p>`;
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
    });
    res.status(200).json({ message: 'Reset link sent to email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change Password (Authenticated)
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Both old and new passwords are required' });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 