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
        //console.log(asset); // Log the assets to verify the structure

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
        //console.log(asset); // Log the assets to verify the structure

        if (asset.length > 0) { // Check if assets are found
            res.json(asset);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Fetch asset details by custom assetId
exports.getAssetDetails = async (req, res) => {
    const { assetId } = req.params;  // Extract the assetId from the URL

    try {
        // Query the asset using the custom assetId field, not the MongoDB _id
        const asset = await Asset.findOne({ assetId: assetId });  // Find asset using assetId field

        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        res.json(asset);  // Send the asset details as a response
    } catch (err) {
        res.status(500).json({ message: "Error fetching asset", error: err });
    }
};

exports.getAssetByAssetId = async (req, res) => {
    try {
        // Extract the requestContact from the URL parameters
        const { requestInput } = req.params;

        // Query the asset by the requestContact field
        const asset = await Asset.find({ assetId: requestInput });
        //console.log(asset); // Log the assets to verify the structure  

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
        console.log(assetId);

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


// Update Asset

// Update Asset
// Update Asset
exports.updateAssetByAssetId = async (req, res) => {
    try {
        const assetId = req.params.requestInput;  // This is your custom asset ID
        const { qtyTaken } = req.body;  // Extract qtyTaken from the request body
        
        // Ensure qtyTaken is a number
        const qtyTakenNumber = Number(qtyTaken);
        
        if (isNaN(qtyTakenNumber) || qtyTakenNumber <= 0) {
            return res.status(400).json({ message: "Invalid quantity taken" });
        }

        // Find the asset by assetId
        const asset = await Asset.findOne({ assetId });

        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        // Calculate the new quantity (subtract qtyTaken from existing quantity)
        const newQuantity = asset.quantity - qtyTakenNumber;

        // Ensure the new quantity doesn't go negative
        if (newQuantity < 0) {
            return res.status(400).json({ message: 'Insufficient quantity' });
        }

        // Update qtyTaken (add the qtyTaken to the existing qtyTaken)
        const newTakenQty = asset.qtyTaken + qtyTakenNumber;

        // Update the asset with the new quantities
        asset.qtyTaken = newTakenQty;
        asset.quantity = newQuantity;

        // Save the updated asset
        const updatedAsset = await asset.save();

        // Send the updated asset back to the client
        res.json(updatedAsset);
    } catch (error) {
        console.error('Error updating asset:', error);
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