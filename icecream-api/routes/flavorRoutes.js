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

  // --- ADD THESE COMMENTS ---
  /**
   * @swagger
   * /flavors:
   * get:
   * tags:
   * - flavors
   * summary: Get all flavors
   * responses:
   * 200:
   * description: Success
   * schema:
   * type: array
   * items:
   * $ref: '#/definitions/flavors'
   * 500:
   * description: Server error
   * post:
   * tags:
   * - flavors
   * summary: Create a new flavor
   * parameters:
   * - in: body
   * name: iceCream
   * description: flavor object to be created
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
    .get(getIceCreams)
    .post(createIceCream);
  
  /**
   * @swagger
   * /flavors/{id}:
   * get:
   * tags:
   * - flavors
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
   * $ref: '#/definitions/flavor'
   * 404:
   * description: flavor not found
   * 500:
   * description: Server error
   * put:
   * tags:
   * - flavors
   * summary: Update an flavor by ID
   * parameters:
   * - in: path
   * name: id
   * schema:
   * type: string
   * required: true
   * description: ID of the flavor to update
   * - in: body
   * name: iceCream
   * description: flavor object with updated fields
   * required: true
   * schema:
   * $ref: '#/definitions/NewIceCream' # Re-using NewIceCream for update body, adjust if PUT has fewer required fields
   * responses:
   * 200:
   * description: Success
   * schema:
   * $ref: '#/definitions/flavor'
   * 400:
   * description: Bad Request (Validation error)
   * 404:
   * description: flavor not found
   * 500:
   * description: Server error
   * delete:
   * tags:
   * - IceCreams
   * summary: Delete an flavor by ID
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
   * description: Ice Cream not found
   * 500:
   * description: Server error
   */
  router.route('/:id')
    .get(getFlavor)
    .put(flavor)
    .delete(flavor);
  
  module.exports = router;

