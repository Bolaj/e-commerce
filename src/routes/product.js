const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/ProductController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createProduct);
router.get('/', auth, getProducts);
router.get('/:id', auth, getProductById);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
