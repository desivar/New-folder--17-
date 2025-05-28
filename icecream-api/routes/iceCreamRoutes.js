// icecream-api/routes/iceCreamRoutes.js
const express = require('express');
const {
  
  getIceCream,
  createIceCream,
  updateIceCream,
  deleteIceCream
} = require('../controllers/iceCreamController');

const router = express.Router();

// --- ADD THESE COMMENTS ---
/**
 * @swagger
 * /icecreams:
 * get:
 * tags:
 * - IceCreams
 * summary: Get all ice creams
 * responses:
 * 200:
 * description: Success
 * schema:
 * type: array
 * items:
 * $ref: '#/definitions/IceCream'
 * 500:
 * description: Server error
 * post:
 * tags:
 * - IceCreams
 * summary: Create a new ice cream
 * parameters:
 * - in: body
 * name: iceCream
 * description: Ice cream object to be created
 * required: true
 * schema:
 * $ref: '#/definitions/NewIceCream'
 * responses:
 * 201:
 * description: Created
 * schema:
 * $ref: '#/definitions/IceCream'
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
 * /icecreams/{id}:
 * get:
 * tags:
 * - IceCreams
 * summary: Get a single ice cream by ID
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID of the ice cream to retrieve
 * responses:
 * 200:
 * description: Success
 * schema:
 * $ref: '#/definitions/IceCream'
 * 404:
 * description: Ice Cream not found
 * 500:
 * description: Server error
 * put:
 * tags:
 * - IceCreams
 * summary: Update an ice cream by ID
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID of the ice cream to update
 * - in: body
 * name: iceCream
 * description: Ice cream object with updated fields
 * required: true
 * schema:
 * $ref: '#/definitions/NewIceCream' # Re-using NewIceCream for update body, adjust if PUT has fewer required fields
 * responses:
 * 200:
 * description: Success
 * schema:
 * $ref: '#/definitions/IceCream'
 * 400:
 * description: Bad Request (Validation error)
 * 404:
 * description: Ice Cream not found
 * 500:
 * description: Server error
 * delete:
 * tags:
 * - IceCreams
 * summary: Delete an ice cream by ID
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: ID of the ice cream to delete
 * responses:
 * 200:
 * description: Success (empty data)
 * 404:
 * description: Ice Cream not found
 * 500:
 * description: Server error
 */
router.route('/:id')
  .get(getIceCream)
  .put(updateIceCream)
  .delete(deleteIceCream);

module.exports = router;