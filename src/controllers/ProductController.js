const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, description, price, imageURL } = req.body;
  try {

    let existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: `Product with name: '${name}' already exist` });
    }

    const product = new Product({
      name,
      description,
      price,
      imageURL,
      createdBy: req.user.id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'username email');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'username email');
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Product not found' });
    res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, imageURL } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.createdBy.toString() !== req.user.id)
      return res.status(401).json({ message: 'User not authorized' });

    if (name && (await Product.findOne({ name, _id: { $ne: req.params.id } }))) {
      return res.status(400).json({ message: `Product with name: '${name}' already exist` });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description, price, imageURL } },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.createdBy.toString() !== req.user.id)
      return res.status(401).json({ message: 'User not authorized' });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
