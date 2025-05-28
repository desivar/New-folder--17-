// icecream-api/models/Flavor.js
const mongoose = require('mongoose');

const FlavorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Flavor name is required'],
    unique: true,
    trim: true,
    maxlength: [30, 'Flavor name cannot be more than 30 characters']
  },
  description: {
    type: String,
    maxlength: [100, 'Description cannot be more than 100 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Flavor', FlavorSchema);