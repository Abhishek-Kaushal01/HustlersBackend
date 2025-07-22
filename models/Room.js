const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  amenities: [{ type: String }],
  address: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema); 