// icecream-api/controllers/flavorController.js
const Flavor = require('../models/Flavor');

// @desc    Get all flavors
// @route   GET /api/v1/flavors
// @access  Public
exports.getFlavors = async (req, res) => {
  try {
    const flavors = await Flavor.find();
    res.status(200).json({ success: true, count: flavors.length, data: flavors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single flavor
// @route   GET /api/v1/flavors/:id
// @access  Public
exports.getFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) {
      return res.status(404).json({ success: false, error: 'Flavor not found' });
    }
    res.status(200).json({ success: true, data: flavor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new flavor
// @route   POST /api/v1/flavors
// @access  Public (for now)
exports.createFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.create(req.body);
    res.status(201).json({ success: true, data: flavor });
  } catch (error) {
    if (error.name === 'ValidationError' || error.code === 11000) { // 11000 for duplicate key error (unique: true)
      const messages = error.code === 11000 ? ['Duplicate flavor name'] : Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update flavor
// @route   PUT /api/v1/flavors/:id
// @access  Public (for now)
exports.updateFlavor = async (req, res) => {
  try {
    let flavor = await Flavor.findById(req.params.id);
    if (!flavor) {
      return res.status(404).json({ success: false, error: 'Flavor not found' });
    }
    flavor = await Flavor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ success: true, data: flavor });
  } catch (error) {
    if (error.name === 'ValidationError' || error.code === 11000) {
      const messages = error.code === 11000 ? ['Duplicate flavor name'] : Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete flavor
// @route   DELETE /api/v1/flavors/:id
// @access  Public (for now)
exports.deleteFlavor = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) {
      return res.status(404).json({ success: false, error: 'Flavor not found' });
    }
    await flavor.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};