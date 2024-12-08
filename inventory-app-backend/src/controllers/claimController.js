const mongoose = require("mongoose");
const Claim = require("../models/claimModel");

//# 1. Retrieve All Claims
exports.getAllClaims = async (req, res) => {
    try {
        
        const claims = await Claim.find();
        if (claims.length > 0) {
            res.json(claims);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Claim
exports.getClaimById = async (req, res) => {
    try {
        const claimId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(claimId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const claim = await Claim.findById(claimId);
        if (claim) {
            res.json(claim);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Claim
exports.createClaim = async (req, res) => {
    try {
        const claim = new Claim(req.body);
        const savedClaim= await claim.save();
        res.status(201).json(savedClaim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Claim
exports.updateClaim = async (req, res) => {
    try {
        const claimId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(claimId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedClaim = await Claim.findByIdAndUpdate(claimId, req.body, { new: true });
        if (updatedClaim) {
            res.json(updatedClaim);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Claim
exports.deleteClaim = async (req, res) => {
    try {
        const claimId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(claimId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedClaim = await Claim.findByIdAndDelete(claimId);
        if (deletedClaim) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};