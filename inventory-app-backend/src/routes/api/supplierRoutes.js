const express = require("express");
const supplierController = require("../../controllers/supplierController");

const router = express.Router();

// Retrieve All Suppliers
router.get("/", supplierController.getAllSuppliers);

// Retrieve One Supplier
router.get("/:id", supplierController.getSupplierById);

// Create Supplier
router.post("/", supplierController.createSupplier);

// Update Supplier
router.put("/:id", supplierController.updateSupplier);

// Delete Supplier
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;