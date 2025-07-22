const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  guests: { type: Number, default: 1 },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema); 