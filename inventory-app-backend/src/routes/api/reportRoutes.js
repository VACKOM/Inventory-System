const express = require("express");
const reportController = require("../../controllers/reportController");

const router = express.Router();

// Endpoint to get fields for a specific collection
router.get("/", reportController.getTables);

// Endpoint to get data for a selected table and fields
router.post("/getReportData", reportController.getReportData);

module.exports = router;