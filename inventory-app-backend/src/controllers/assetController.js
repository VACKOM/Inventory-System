const mongoose = require("mongoose");
const Asset = require("../models/assetModel");

//# 1. Retrieve All Assets
exports.getAllAssets = async (req, res) => {
    try {
        
        const assets = await Asset.find();
        if (assets.length > 0) {
            res.json(assets);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Asset
exports.getAssetById = async (req, res) => {
    try {
        const assetId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(assetId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const asset = await Asset.findById(assetId);
        if (asset) {
            res.json(asset);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/// Retrieve One Asset by requesting contact
exports.getAssetByContact = async (req, res) => {
    try {
        // Extract the requestContact from the URL parameters
        const { requestInput } = req.params;
       
        // Query the asset by the requestContact field
        const asset = await Asset.find({ requestContact: requestInput });
        console.log(asset); // Log the assets to verify the structure

        if (asset.length > 0) { // Check if assets are found
            res.json(asset);
        } else {
            res.status(404).json({ message: "No Record Found ooooo :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAssetByName = async (req, res) => {
    try {
        // Extract the requestContact from the URL parameters
        const { requestInput } = req.params;

        // Query the asset by the requestContact field
        const asset = await Asset.find({ requestingOfficer: requestInput });
        console.log(asset); // Log the assets to verify the structure

        if (asset.length > 0) { // Check if assets are found
            res.json(asset);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Create Asset
exports.createAsset = async (req, res) => {
    try {
        const asset = new Asset(req.body);
        const savedAsset= await asset.save();
        res.status(201).json(savedAsset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Asset
exports.updateAsset = async (req, res) => {
    try {
        const assetId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(assetId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedAsset = await Asset.findByIdAndUpdate(assetId, req.body, { new: true });
        if (updatedAsset) {
            res.json(updatedAsset);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Asset
exports.deleteAsset = async (req, res) => {
    try {
        const assetId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(assetId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedAsset = await Asset.findByIdAndDelete(assetId);
        if (deletedAsset) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};