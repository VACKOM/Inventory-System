const mongoose = require("mongoose");
const Department = require("../models/departmentModel");

//# 1. Retrieve All Departments
exports.getAllDepartments = async (req, res) => {
    try {
        
        const departments = await Department.find();
        if (departments.length > 0) {
            res.json(departments);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Department
exports.getDepartmentById = async (req, res) => {
    try {
        const departmentId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(departmentId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const department = await Department.findById(departmentId);
        if (department) {
            res.json(department);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Department
exports.createDepartment = async (req, res) => {
    try {
        const department = new Department(req.body);
        const savedDepartment= await department.save();
        res.status(201).json(savedDepartment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Department
exports.updateDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(departmentId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedDepartment = await Department.findByIdAndUpdate(departmentId, req.body, { new: true });
        if (updatedDepartment) {
            res.json(updatedDepartment);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Department
exports.deleteDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(departmentId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedDepartment = await Department.findByIdAndDelete(departmentId);
        if (deletedDepartment) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};