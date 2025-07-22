const express = require('express');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Dashboard
router.get('/dashboard', protect, adminOnly, adminController.getDashboardStats);

// User management
router.get('/users', protect, adminOnly, adminController.getAllUsers);
router.put('/users/:id/promote', protect, adminOnly, adminController.promoteUser);
router.delete('/users/:id', protect, adminOnly, adminController.deleteUser);

// Room management
router.get('/rooms', protect, adminOnly, adminController.getAllRooms);
router.post('/rooms', protect, adminOnly, adminController.createRoom);
router.put('/rooms/:id', protect, adminOnly, adminController.updateRoom);
router.delete('/rooms/:id', protect, adminOnly, adminController.deleteRoom);

// Booking management
router.get('/bookings', protect, adminOnly, adminController.getAllBookings);
router.get('/bookings/filter', protect, adminOnly, adminController.filterBookings);

module.exports = router; 