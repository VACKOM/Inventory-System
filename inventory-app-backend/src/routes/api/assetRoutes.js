const express = require("express");
const assetController = require("../../controllers/assetController");

const router = express.Router();

// Retrieve All Assets
router.get("/", assetController.getAllAssets);

// Retrieve One Asset
router.get("/:id", assetController.getAssetById);

// Retrieve One Asset
router.get("/assetId/:assetId", assetController.getAssetDetails);

// Retrieve One Asset by request contact
router.get("/contact/:requestInput", assetController.getAssetByContact);

// Retrieve One Asset by request Name
router.get("/name/:requestInput", assetController.getAssetByName);

// Retrieve One Asset by request Name
router.get("/assetId/:requestInput", assetController.getAssetByAssetId);

// Create Asset
router.post("/", assetController.createAsset);

// Update Asset
router.put("/:id", assetController.updateAsset);

// Update Asset
router.put("/assetId/:requestInput", assetController.updateAssetByAssetId);

// Delete Asset
router.delete("/:id", assetController.deleteAsset);

module.exports = router;