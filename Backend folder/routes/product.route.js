const { Router } = require("express");
const productController = require('../controllers/product.controller');
const route = Router()

route.get('/get-all-product', productController.getAllProducts)
route.post('/create-product', productController.createProduct)
route.put('/update-product/:id', productController.updateProduct)
route.delete('/delete-product/:id', productController.deleteProduct)

module.exports = route;