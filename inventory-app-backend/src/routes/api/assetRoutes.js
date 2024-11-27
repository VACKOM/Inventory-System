const express = require("express");
const assetController = require("../../controllers/assetController");

const router = express.Router();

// Retrieve All Assets
router.get("/", assetController.getAllAssets);

// Retrieve One Asset
router.get("/:id", assetController.getAssetById);

// Create Asset
router.post("/", assetController.createAsset);

// Update Asset
router.put("/:id", assetController.updateAsset);

// Delete Asset
router.delete("/:id", assetController.deleteAsset);

module.exports = router;