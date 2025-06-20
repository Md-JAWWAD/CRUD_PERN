const { Op } = require("sequelize");
const db = require("../models/index.js");
const ProductRepo = require("../repos/product.repo.js");
const {
  validateCreateProduct,
  validateUpdateProduct,
} = require("../validators/product.validator.js");
const BaseController = require("./base.controller.js");

class ProductController extends BaseController {
  constructor() {
    super();
  }

  getProductById = async (req, res) => {
    const { id } = req?.params;
    const Product = await ProductRepo.findProduct(id);

    if (!Product) {
      return this.errorResponse(res, "Product ID not found", 404);
    }

    return this.successResponse(res, Product, "Product retrieved successfully");
  };

  getAllProducts = async (req, res) => {
    const {
      sortBy = "id",
      sortOrder = "DESC",
      page = 1,
      limit = 10,
      search = "",
    } = req?.query;

    const skip = (page - 1) * limit;

    const searchConditions = {
      isDeleted: false,
    };

    if (search) {
      searchConditions[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        // Due to Number 'iLike' need to use string but we have number.
        // { price: { [Op.iLike]: `%${search.toString()}%` } },
        // { stock: { [Op.iLike]: `%${search.toString()}%` } },
      ];
    }

    const options = {
      where: searchConditions,
      limit: parseInt(limit),
      order: [[sortBy, sortOrder]],
      offset: skip,
    };
    const Products = await ProductRepo.getProducts(options);
    return this.successResponse(
      res,
      Products,
      "Products retrieved successfully"
    );
  };

  createProduct = async (req, res) => {
    const validationResult = validateCreateProduct(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    // const { ProductData } = req.body;

    try {
      const Product = await ProductRepo.createProduct(req.body);
      return this.successResponse(res, Product, "Product created successfully");
    } catch (e) {
      return this.errorResponse(res, "Error creating product", 400, e);
    }
  };

  updateProduct = async (req, res) => {
    const { id } = req.params;
    const validationResult = validateUpdateProduct(req.body);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const isProduct = await ProductRepo.isProductExist(id);

    if (!isProduct) {
      return this.errorResponse(res, "Product ID not found", 404);
    }

    const Product = await ProductRepo.updateProduct(req.body, id);
    return this.successResponse(res, Product, "Product updated successfully");
  };

  deleteProduct = async (req, res) => {
    let { id } = req?.params;
    let { type } = req?.query;

    const isProduct = await ProductRepo.isProductExist(id);

    if (!isProduct) {
      return this.errorResponse(res, "Product ID not found", 404);
    }
    // type = type ? type : "soft";
    const Product = await ProductRepo.deleteProduct(id, type);
    return this.successResponse(
      res,
      Product,
      `Product with ID ${id} deleted successfully`
    );
  };
}

module.exports = new ProductController();
