const router = require('express').Router();
const authController = require('./controllers/authController');
const recipeController = require('./controllers/recipeController');
const productsController = require('./controllers/productsController');

router.use('/users', authController);
router.use('/recipes', recipeController);
router.use('/products', productsController);

module.exports = router;