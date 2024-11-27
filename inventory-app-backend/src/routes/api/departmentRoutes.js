const express = require("express");
const departmentController = require("../../controllers/departmentController");

const router = express.Router();

// Retrieve All Departments
router.get("/", departmentController.getAllDepartments);

// Retrieve One Department
router.get("/:id", departmentController.getDepartmentById);

// Create Department
router.post("/", departmentController.createDepartment);

// Update Department
router.put("/:id", departmentController.updateDepartment);

// Delete Department
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;