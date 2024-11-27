const mongoose = require("mongoose");
const Staff = require("../models/staffModel");

//# 1. Retrieve All Staff
exports.getAllStaff = async (req, res) => {
    try {
        
        const staff = await Staff.find();
        if (staff.length > 0) {
            res.json(staff);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Staff
exports.getStaffById = async (req, res) => {
    try {
        const staffId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(staffId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const staff = await Staff.findById(staffId);
        if (staff) {
            res.json(staff);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Staff
exports.createStaff = async (req, res) => {
    try {
        const staff = new Staff(req.body);
        const savedStaff= await staff.save();
        res.status(201).json(savedStaff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Staff
exports.updateStaff = async (req, res) => {
    try {
        const staffId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(staffId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedStaff = await Staff.findByIdAndUpdate(staffId, req.body, { new: true });
        if (updatedStaff) {
            res.json(updatedStaff);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Staff
exports.deleteStaff = async (req, res) => {
    try {
        const staffId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(staffId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedStaff = await Staff.findByIdAndDelete(staffId);
        if (deletedStaff) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};