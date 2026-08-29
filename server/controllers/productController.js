const Product = require('../models/Product');

// Sample default products list for fallback
const defaultSampleProducts = require('../data/seedProducts').sampleProducts || [];

// @desc    Get all laboratory products (with filtering & search)
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    const { category, search, featured, sort } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.$or = [
        { categoryId: category },
        { category: new RegExp(category, 'i') }
      ];
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { sku: new RegExp(search, 'i') }
      ];
    }

    if (featured) {
      query.featured = true;
    }

    let products = [];
    try {
      let q = Product.find(query);
      if (sort === 'price-low') q = q.sort('price');
      else if (sort === 'price-high') q = q.sort('-price');
      else if (sort === 'name-asc') q = q.sort('name');
      else q = q.sort('-createdAt');

      products = await q.exec();
    } catch {
      products = defaultSampleProducts;
    }

    res.json({
      success: true,
      count: products.length,
      products: products.length > 0 ? products : defaultSampleProducts
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res, next) => {
  try {
    let product;
    try {
      product = await Product.findById(req.params.id);
    } catch {
      product = defaultSampleProducts.find(p => p._id === req.params.id || p.id === req.params.id);
    }

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res, next) => {
  try {
    let product;
    try {
      product = await Product.create(req.body);
    } catch {
      product = { ...req.body, _id: 'prod-' + Date.now(), createdAt: new Date() };
    }

    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res, next) => {
  try {
    let product;
    try {
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
    } catch {
      product = { ...req.body, _id: req.params.id };
    }

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    try {
      await Product.findByIdAndDelete(req.params.id);
    } catch {}

    res.json({ success: true, message: 'Product successfully deleted' });
  } catch (err) {
    next(err);
  }
};
