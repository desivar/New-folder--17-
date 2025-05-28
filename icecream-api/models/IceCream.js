// icecream-api/models/IceCream.js
const mongoose = require('mongoose');

const IceCreamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ice cream name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  flavor: { // Reference to Flavor collection
    type: mongoose.Schema.ObjectId,
    ref: 'Flavor', // This refers to the 'Flavor' model
    required: [true, 'Flavor is required']
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  caloriesPerServing: {
    type: Number,
    required: false, // Optional field
    min: [0, 'Calories cannot be negative']
  },
  allergens: { // Array of strings
    type: [String],
    default: []
  },
  // At least 7 fields: name, flavor, description, price, inStock, caloriesPerServing, allergens
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('IceCream', IceCreamSchema);