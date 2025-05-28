// icecream-api/routes/flavorRoutes.js
const express = require('express');
const {
  getFlavors, // ADDED: getFlavors to the destructuring
  getFlavor,
  createFlavor,
  updateFlavor,
  deleteFlavor
}
= require('../controllers/flavorController');

const router = express.Router();

// This is the SINGLE router.route('/') block with its associated Swagger comments
/**
 * @swagger
 * /flavors:
 * get:
 * tags:
 * - Flavors
 * summary: Get all flavors
 * responses:
 * 200:
 * description: Success
 * schema:
 * type: array
 * items:
 * $ref: '#/definitions/Flavor' # Use 'Flavor' here, not 'flavors'
 * 500:
 * description: Server error
 * post:
 * tags:
 * - Flavors
 * summary: Create a new flavor
 * parameters:
 * - in: body
 * name: flavor
 * description: Flavor object to be created
 * required: true
 * schema:
 * $ref: '#/definitions/NewFlavor'
 * responses:
 * 201:
 * description: Created
 * schema:
 * $ref: '#/definitions/Flavor'
 * 400:
 * description: Bad Request (Validation error)
 * 500:
 * description: Server error
 */
router.route('/')
  .get(getFlavors) // Ensure getFlavors is used here
  .post(createFlavor);

// This is the SINGLE router.route('/:id') block with its associated Swagger comments
/**
 * @swagger
 * /flavors/{id}:
 * get:
 * tags:
 * - Flavors
 * summary: Get a single flavor by ID
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID of the flavor to retrieve
 * responses:
 * 200:
 * description: Success
 * schema:
 * $ref: '#/definitions/Flavor' # Use 'Flavor'
 * 404:
 * description: Flavor not found
 * 500:
 * description: Server error
 * put:
 * tags:
 * - Flavors
 * summary: Update a flavor by ID
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID of the flavor to update
 * - in: body
 * name: flavor
 * description: Flavor object with updated fields
 * required: true
 * schema:
 * $ref: '#/definitions/NewFlavor' # CORRECTED: Changed from NewIceCream to NewFlavor
 * responses:
 * 200:
 * description: Success
 * schema:
 * $ref: '#/definitions/Flavor' # Use 'Flavor'
 * 400:
 * description: Bad Request (Validation error)
 * 404:
 * description: Flavor not found
 * 500:
 * description: Server error
 * delete:
 * tags:
 * - Flavors
 * summary: Delete a flavor by ID
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID of the flavor to delete
 * responses:
 * 200:
 * description: Success (empty data)
 * 404:
 * description: Flavor not found
 * 500:
 * description: Server error
 */
router.route('/:id')
  .get(getFlavor)
  .put(updateFlavor)
  .delete(deleteFlavor);

module.exports = router;