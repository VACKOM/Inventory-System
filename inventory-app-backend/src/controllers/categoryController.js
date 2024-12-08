const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

//# 1. Retrieve All Categories
exports.getAllCategories = async (req, res) => {
    try {
        
        const categories = await Category.find();
        if (categories.length > 0) {
            res.json(categories);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Category
exports.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const category = await Category.findById(categoryId);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Category
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const savedCategory= await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Category
exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
        if (updatedCategory) {
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (deletedCategory) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};