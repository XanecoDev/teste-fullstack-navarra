// CONSTANTS
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

// BODY PARSERS
const jsonParser = bodyParser.json();

// CONTROLLERS
const productController = require('../controllers/product.controller');

// ROUTES
router.post('/array/length', jsonParser, productController.postArray);
router.post('/array/order', jsonParser, productController.postOrderArray);
router.get('/array/order/api', jsonParser, productController.postOrderArrayApi);
router.get('/', productController.getSuccess);

// EXPORT
module.exports = router;