const Product = require("../Model/ProductManagementModel");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    console.error(err); // Use console.error for better visibility in logs
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No item found" });
    }
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, image, location, price, code } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).json({ message: "Name is required" }); // Validate required field
  }
  // Optional: Add more validations for other fields here

  try {
    const product = new Product({
      name,
      image,
      location,
      price,
      code,
    });
    await product.save();
    res.status(201).json({ product }); // Ensure response structure is clear
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, image, location, price, code } = req.body;

  // Validate input
  if (!name) {
    return res.status(400).json({ message: "Name is required" }); // Validate required field
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product properties
    product.name = name;
    product.image = image;
    product.location = location;
    product.price = price;
    product.code = code;

    await product.save();
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
