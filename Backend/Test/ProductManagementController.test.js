// tests/ProductManagementController.test.js
const request = require('supertest');
const express = require('express');
const { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct } = require('../Controllers/ProductManagementController');
const Product = require('../Model/ProductManagementModel');

// Mock Mongoose model
jest.mock('../Model/ProductManagementModel');

// Create an express app for testing
const app = express();
app.use(express.json());

app.get('/products', getAllProducts);
app.post('/products', addProduct);
app.get('/products/:id', getProductById);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

describe('ProductManagementController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive and negative test for adding a new product
  test('should add a new product with valid data (positive case)', async () => {
    const newProduct = {
      name: 'Product A',
      image: 'image_url',
      location: 'USA',
      price: 100,
      code: 'P100',
    };

    // Mock save to return the product
    Product.prototype.save = jest.fn().mockResolvedValue({
      _id: '1',
      ...newProduct,
    });

    const response = await request(app).post('/products').send(newProduct);
    expect(response.status).toBe(201); // Assertion 1
    expect(response.body.product.name).toBe('Product A'); // Assertion 2
    expect(response.body.product.price).toBe(100); // Assertion 3
  });

  test('should not add a product with missing fields (negative case)', async () => {
    const invalidProduct = {
      // Missing 'name' field
      image: 'image_url',
      location: 'USA',
      price: 100,
      code: 'P100',
    };

    const response = await request(app).post('/products').send(invalidProduct);
    expect(response.status).toBe(400); // Assertion 1
    expect(response.body.message).toBe('Name is required'); // Ensure this matches your error handling
  });

  // Positive and negative test for getting a product by ID
  test('should get a product by ID (positive case)', async () => {
    const product = { _id: '1', name: 'Product A', price: 100 };

    Product.findById.mockResolvedValue(product);

    const response = await request(app).get('/products/1');
    expect(response.status).toBe(200); // Assertion 1
    expect(response.body.product.name).toBe('Product A'); // Assertion 2
    expect(response.body.product.price).toBe(100); // Assertion 3
  });

  test('should return 404 when product not found (negative case)', async () => {
    Product.findById.mockResolvedValue(null);

    const response = await request(app).get('/products/999');
    expect(response.status).toBe(404); // Assertion 1
    expect(response.body.message).toBe('No item found'); // Assertion 2
  });

  // Positive and negative test for updating a product
  test('should update a product with valid data (positive case)', async () => {
    const updatedProduct = {
      name: 'Product B',
      image: 'image_url',
      location: 'Canada',
      price: 200,
      code: 'P200',
    };

    Product.findById.mockResolvedValue({
      _id: '1',
      name: 'Product A',
      image: 'image_url',
      location: 'USA',
      price: 100,
      code: 'P100',
      save: jest.fn().mockResolvedValue({
        _id: '1',
        ...updatedProduct,
      }),
    });

    const response = await request(app).put('/products/1').send(updatedProduct);
    expect(response.status).toBe(200); // Assertion 1
    expect(response.body.product.name).toBe('Product B'); // Assertion 2
    expect(response.body.product.price).toBe(200); // Assertion 3
  });

  test('should return 404 when updating non-existent product (negative case)', async () => {
    Product.findById.mockResolvedValue(null);

    const response = await request(app).put('/products/999').send({
      name: 'Non-existent Product',
      price: 100,
    });
    expect(response.status).toBe(404); // Assertion 1
    expect(response.body.message).toBe('Product not found'); // Assertion 2
  });

  // Positive test for deleting a product
  test('should delete a product (positive case)', async () => {
    Product.findByIdAndDelete.mockResolvedValue({
      _id: '1',
      name: 'Product A',
      price: 100,
    });

    const response = await request(app).delete('/products/1');
    expect(response.status).toBe(200); // Assertion 1
    expect(response.body.message).toBe('Product deleted successfully'); // Assertion 2
  });

  test('should return 404 when deleting a non-existent product (negative case)', async () => {
    Product.findByIdAndDelete.mockResolvedValue(null);

    const response = await request(app).delete('/products/999');
    expect(response.status).toBe(404); // Assertion 1
    expect(response.body.message).toBe('Product not found'); // Assertion 2
  });
});
