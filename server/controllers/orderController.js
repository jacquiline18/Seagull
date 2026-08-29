const Order = require('../models/Order');

// In-memory fallback array for orders if Mongo is offline
let localOrders = [
  {
    _id: 'ORD-2026-001',
    customer: {
      name: 'Dr. Juma Mwinyi',
      email: 'juma.mwinyi@udsm.ac.tz',
      phone: '+255 754 123 456',
      company: 'University of Dar es Salaam (Chemistry Dept)',
      deliveryAddress: 'Chemistry Building, University Main Campus, Dar es Salaam'
    },
    products: [
      { name: 'Precision Digital Analytical Balance (0.0001g / 220g)', price: 1850000, quantity: 2 },
      { name: 'Digital Magnetic Hotplate Stirrer (550°C, 1500 RPM)', price: 780000, quantity: 3 }
    ],
    totalAmount: 6040000,
    notes: 'Please include official VAT invoice and calibration certificate.',
    status: 'Processing',
    createdAt: new Date('2026-08-25T10:30:00.000Z')
  },
  {
    _id: 'ORD-2026-002',
    customer: {
      name: 'Amina Rashid',
      email: 'a.rashid@kilimanjarodiagnostics.co.tz',
      phone: '+255 784 987 654',
      company: 'Kilimanjaro Medical Research Lab',
      deliveryAddress: 'Moshi Hospital Road, Kilimanjaro'
    },
    products: [
      { name: 'Advanced Binocular Biological Compound Microscope (1600X)', price: 1450000, quantity: 1 },
      { name: 'Laboratory Chemical Splash & Impact Safety Goggles', price: 35000, quantity: 10 }
    ],
    totalAmount: 1800000,
    notes: 'Urgent delivery required for pathology department.',
    status: 'Confirmed',
    createdAt: new Date('2026-08-27T14:15:00.000Z')
  }
];

// @desc    Create new customer order / quotation request
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res, next) => {
  try {
    const { customer, products, totalAmount, notes } = req.body;

    if (!customer || !products || products.length === 0) {
      return res.status(400).json({ success: false, error: 'Please provide customer information and ordered items' });
    }

    let order;
    try {
      order = await Order.create({
        customer,
        products,
        totalAmount,
        notes,
        status: 'Pending'
      });
    } catch {
      order = {
        _id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
        customer,
        products,
        totalAmount,
        notes,
        status: 'Pending',
        createdAt: new Date()
      };
      localOrders.unshift(order);
    }

    res.status(201).json({
      success: true,
      message: 'Order request submitted successfully',
      order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
  try {
    let orders = [];
    try {
      orders = await Order.find().sort('-createdAt');
    } catch {
      orders = localOrders;
    }

    res.json({
      success: true,
      count: orders.length,
      orders: orders.length > 0 ? orders : localOrders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
exports.getOrderById = async (req, res, next) => {
  try {
    let order;
    try {
      order = await Order.findById(req.params.id);
    } catch {
      order = localOrders.find(o => o._id === req.params.id);
    }

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let order;

    try {
      order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      );
    } catch {
      const idx = localOrders.findIndex(o => o._id === req.params.id);
      if (idx !== -1) {
        localOrders[idx].status = status;
        order = localOrders[idx];
      }
    }

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      order
    });
  } catch (err) {
    next(err);
  }
};
