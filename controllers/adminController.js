const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

// Dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();
    res.json({ totalUsers, totalRooms, totalBookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User management
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.promoteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: 'admin' }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User promoted to admin', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Room management
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Booking management
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').populate('room', 'name');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.filterBookings = async (req, res) => {
  try {
    const { user, room } = req.query;
    const filter = {};
    if (user) filter.user = user;
    if (room) filter.room = room;
    const bookings = await Booking.find(filter).populate('user', 'name email').populate('room', 'name');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 