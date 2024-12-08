const express = require("express");
const categoryController = require("../../controllers/categoryController");

const router = express.Router();

// Retrieve All Categories
router.get("/", categoryController.getAllCategories);

// Retrieve One Category
router.get("/:id", categoryController.getCategoryById);

// Create Category
router.post("/", categoryController.createCategory);

// Update Category
router.put("/:id", categoryController.updateCategory);

// Delete Category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;