const mongoose = require("mongoose");
const Supplier = require("../models/supplierModel");

//# 1. Retrieve All Suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers.length > 0 ? suppliers : { message: "No Records Found :(", data: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Supplier
exports.getSupplierById = async (req, res) => {
    try {
        const supplierId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(supplierId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const supplier = await Supplier.findById(supplierId);
        res.status(supplier ? 200 : 404).json(
            supplier || { message: "No Record Found :(" }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Supplier
exports.createSupplier = async (req, res) => {
    try {
        const supplier = new Supplier(req.body);
        const savedSupplier = await supplier.save();
        res.status(201).json(savedSupplier);
    } catch (error) {
        // Handle duplicate key error (11000 for MongoDB)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue);
            res.status(400).json({ message: `${field} must be unique`, field });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Update Supplier
exports.updateSupplier = async (req, res) => {
    try {
        const supplierId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(supplierId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        // Prevent updates to immutable fields
        const updates = { ...req.body };
        delete updates.email;

        const updatedSupplier = await Supplier.findByIdAndUpdate(supplierId, updates, {
            new: true,
            runValidators: true, // Ensure validations are applied on update
        });

        res.status(updatedSupplier ? 200 : 404).json(
            updatedSupplier || { message: "No Record Found to Update :(" }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Supplier
exports.deleteSupplier = async (req, res) => {
    try {
        const supplierId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(supplierId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
        res.status(deletedSupplier ? 200 : 404).json(
            deletedSupplier
                ? { message: "Record Deleted Successfully", deletedSupplier }
                : { message: "No Record Found to Delete :(" }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};