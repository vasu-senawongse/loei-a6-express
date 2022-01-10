const BaseController = require('../../controllers/BaseController');
module.exports = (app) => {
  app.get("/products/get-products", BaseController.getProducts);
  app.delete("/products/delete-product", BaseController.deleteProduct);
  app.post("/products/create-product", BaseController.createProduct);
};
