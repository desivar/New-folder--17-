// icecream-api/routes/flavorRoutes.js
const express = require('express');
const {
  getFlavors,
  getFlavor,
  createFlavor,
  updateFlavor,
  deleteFlavor
}
= require('../controllers/flavorController');

const router = express.Router();

router.route('/')
  .get(getFlavors)
  .post(createFlavor);

router.route('/:id')
  .get(getFlavor)
  .put(updateFlavor)
  .delete(deleteFlavor);

module.exports = router;