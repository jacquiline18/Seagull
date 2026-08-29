const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Precision Digital Analytical Balance (0.0001g / 220g)',
    sku: 'SGL-BAL-220A',
    category: 'Measuring Equipment',
    categoryId: 'measuring',
    price: 1850000,
    stock: 8,
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-accurate electromagnetic force compensation analytical balance engineered for academic, pharmaceutical, and industrial analytical chemistry laboratories. Features internal automatic calibration and backlit LCD display.',
    specifications: {
      'Capacity': '220 g',
      'Readability / Precision': '0.0001 g (0.1 mg)',
      'Repeatability': '±0.0002 g',
      'Pan Size': 'Φ 90 mm Stainless Steel',
      'Display': 'High Contrast Dual Backlit LCD',
      'Interface': 'RS232 / USB Data Export',
      'Power Supply': '100-240V AC, 50/60Hz'
    },
    features: [
      'Electromagnetic Force Restoration transducer for peak accuracy',
      'Built-in overload protection and tare facility',
      'Direct density measurement and piece counting mode'
    ]
  },
  {
    name: 'Digital Magnetic Hotplate Stirrer (550°C, 1500 RPM)',
    sku: 'SGL-STR-550H',
    category: 'Chemistry Equipment',
    categoryId: 'chemistry',
    price: 780000,
    stock: 15,
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    description: 'Glass-ceramic work plate hotplate stirrer providing rapid heating and superior chemical resistance to acids and alkalis. Digital PID microprocessor ensures precise temperature control and quiet stirring.',
    specifications: {
      'Max Heating Temperature': '550 °C',
      'Speed Range': '100 - 1500 RPM',
      'Max Stirring Volume': '20 Liters',
      'Plate Material': 'Corrosion-Resistant Glass Ceramic (184x184mm)'
    },
    features: [
      'Digital LED display for simultaneous temperature and stirring speed',
      'Ceramic glass plate with high thermal shock tolerance'
    ]
  },
  {
    name: 'Advanced Binocular Biological Compound Microscope (1600X)',
    sku: 'SGL-MIC-1600B',
    category: 'Laboratory Instruments',
    categoryId: 'instruments',
    price: 1450000,
    stock: 6,
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    description: 'High-resolution binocular microscope equipped with Plan Achromatic infinity optics, 3W variable LED Koehler illumination, and a double-layer mechanical stage. Ideal for medical diagnosis, cytology, histology, and university research.',
    specifications: {
      'Optical System': 'Infinity Color Corrected Optical System (CCIS)',
      'Magnification': '40X - 1600X',
      'Objectives': 'Achromatic 4X, 10X, 40X(S), 100X(S, Oil)'
    },
    features: [
      'Anti-fungal coating on all internal optical components',
      'Ergonomic 30° inclined Siedentopf binocular head'
    ]
  },
  {
    name: 'Microprocessor Benchtop Digital pH / mV / Temp Meter',
    sku: 'SGL-PHM-900D',
    category: 'Measuring Equipment',
    categoryId: 'measuring',
    price: 620000,
    stock: 12,
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'High accuracy benchtop pH meter with automatic temperature compensation (ATC), 3-point calibration, and comprehensive buffer recognition for water testing, soil analysis, and chemical QC.',
    specifications: {
      'pH Range': '-2.00 to 18.00 pH',
      'pH Accuracy': '±0.01 pH',
      'Calibration': '1, 2, or 3-Point Auto Buffer Recognition'
    },
    features: [
      'Automatic Temperature Compensation (ATC)',
      'Large LCD display with simultaneous pH and temperature readout'
    ]
  },
  {
    name: 'Digital Benchtop Laboratory Centrifuge (4000 RPM / 8x15ml)',
    sku: 'SGL-CEN-4000D',
    category: 'Laboratory Instruments',
    categoryId: 'instruments',
    price: 950000,
    stock: 9,
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    description: 'Low-speed benchtop electric centrifuge with digital timer and speed regulation. Built with an imbalance protection system, electronic lid safety lock, and durable ABS plastic casing.',
    specifications: {
      'Max Speed': '4000 RPM',
      'Rotor Capacity': '8 x 15 ml or 12 x 10 ml',
      'Noise Level': '≤ 55 dB(A)'
    },
    features: [
      'Electronic safety lid interlock',
      'Maintenance-free brushless DC motor'
    ]
  },
  {
    name: 'Class A Borosilicate Glass Burette with PTFE Stopcock (50ml)',
    sku: 'SGL-BUR-50A',
    category: 'Glassware',
    categoryId: 'glassware',
    price: 85000,
    stock: 45,
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    description: 'High-precision Class A volumetric burette manufactured from thermal shock resistant Borosilicate 3.3 glass with blue graduation markings and grease-free straight bore PTFE stopcock.',
    specifications: {
      'Capacity': '50 ml',
      'Graduation Interval': '0.10 ml',
      'Material': 'Borosilicate 3.3 Glass'
    },
    features: [
      'Individually calibrated with batch certificate',
      'PTFE stopcock requires zero grease'
    ]
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/seagull_db';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB...');

    // Clear existing
    await User.deleteMany();
    await Product.deleteMany();

    // Create Admin User
    await User.create({
      name: 'Seagull Admin Operations',
      email: 'admin@seagull.co.tz',
      password: 'admin123',
      role: 'admin'
    });
    console.log('[Seed] Admin user created: admin@seagull.co.tz / admin123');

    // Create Products
    await Product.insertMany(sampleProducts);
    console.log(`[Seed] Inserted ${sampleProducts.length} scientific products into database.`);

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error.message);
    process.exit(1);
  }
};

// If run directly via node seedProducts.js
if (require.main === module) {
  seedDatabase();
}

module.exports = { sampleProducts };
