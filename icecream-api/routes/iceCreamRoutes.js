// icecream-api/routes/iceCreamRoutes.js
const express = require('express');
const {
  getIceCreams,
  getIceCream,
  createIceCream,
  updateIceCream,
  deleteIceCream
} = require('../controllers/iceCreamController');

const router = express.Router();

router.route('/')
  .get(getIceCreams)
  .post(createIceCream);

router.route('/:id')
  .get(getIceCream)
  .put(updateIceCream)
  .delete(deleteIceCream);

module.exports = router;