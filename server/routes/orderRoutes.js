const express = require('express');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(createOrder)
  .get(protect, getOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, updateOrderStatus);

module.exports = router;
