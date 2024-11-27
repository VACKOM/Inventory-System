const express = require("express");
const staffController = require("../../controllers/staffController");

const router = express.Router();

// Retrieve All Staff
router.get("/", staffController.getAllStaff);

// Retrieve One Staff
router.get("/:id", staffController.getStaffById);

// Create Staff
router.post("/", staffController.createStaff);

// Update Staff
router.put("/:id", staffController.updateStaff);

// Delete Staff
router.delete("/:id", staffController.deleteStaff);

module.exports = router;