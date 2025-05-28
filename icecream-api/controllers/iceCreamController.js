// icecream-api/controllers/iceCreamController.js
const IceCream = require('../models/IceCream');
const Flavor = require('../models/Flavor'); // Needed for population

// @desc    Get all ice creams
// @route   GET /api/v1/icecreams
// @access  Public
exports.getIceCreams = async (req, res) => {
  try {
    const iceCreams = await IceCream.find().populate('flavor'); // Populate flavor details
    res.status(200).json({ success: true, count: iceCreams.length, data: iceCreams });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single ice cream
// @route   GET /api/v1/icecreams/:id
// @access  Public
exports.getIceCream = async (req, res) => {
  try {
    const iceCream = await IceCream.findById(req.params.id).populate('flavor');
    if (!iceCream) {
      return res.status(404).json({ success: false, error: 'Ice Cream not found' });
    }
    res.status(200).json({ success: true, data: iceCream });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new ice cream
// @route   POST /api/v1/icecreams
// @access  Public (for now)
exports.createIceCream = async (req, res) => {
  try {
    const iceCream = await IceCream.create(req.body);
    res.status(201).json({ success: true, data: iceCream });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update ice cream
// @route   PUT /api/v1/icecreams/:id
// @access  Public (for now)
exports.updateIceCream = async (req, res) => {
  try {
    let iceCream = await IceCream.findById(req.params.id);
    if (!iceCream) {
      return res.status(404).json({ success: false, error: 'Ice Cream not found' });
    }
    iceCream = await IceCream.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Run schema validators on update
    }).populate('flavor');
    res.status(200).json({ success: true, data: iceCream });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete ice cream
// @route   DELETE /api/v1/icecreams/:id
// @access  Public (for now)
exports.deleteIceCream = async (req, res) => {
  try {
    const iceCream = await IceCream.findById(req.params.id);
    if (!iceCream) {
      return res.status(404).json({ success: false, error: 'Ice Cream not found' });
    }
    await iceCream.deleteOne(); // Use deleteOne() for Mongoose 5.x/6.x or remove() for older
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};