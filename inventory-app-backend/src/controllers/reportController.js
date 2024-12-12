const mongoose = require("mongoose");
const { Claims, Assets, Suppliers } = require("../models/reportsModel");

// #1. Retrieve All Assets
exports.getTables = (req, res) => {
    res.json([
        {
            name: 'Assets',
            fields: [
                { field: 'assetId', displayName: 'Asset ID' },
                { field: 'name', displayName: 'Asset Name' },
                { field: 'qtySupplied', displayName: 'Quantity Supplied' },
                { field: 'qtyTaken', displayName: 'Quantity Taken' },
                { field: 'quantity', displayName: 'Total Quantity' },
                { field: 'supplier', displayName: 'Supplier' },
                { field: 'requestingOfficer', displayName: 'Requesting Officer' },
                { field: 'location', displayName: 'Location' }
            ]
        },
        {
            name: 'Asset Claims',
            fields: [
                { field: 'assetId', displayName: 'Asset ID' },
                { field: 'assetName', displayName: 'Asset Name' },
                { field: 'requestingOfficer', displayName: 'Requesting Officer' },
                { field: 'qtyTaken', displayName: 'Quantity Taken' },
                { field: 'selectedContact', displayName: 'Collected By' },
                { field: 'selectedApprovingAuthority', displayName: 'Approving Authority' },
                { field: 'selectedCertifyingAuthority', displayName: 'Certifying Authority' }
            ]
        },
        {
            name: 'Suppliers',
            fields: [
                { field: 'supplierId', displayName: 'Supplier ID' },
                { field: 'name', displayName: 'Supplier Name' },
                { field: 'description', displayName: 'Description' },
                { field: 'location', displayName: 'Location' },
                { field: 'contactPerson', displayName: 'Collected By' },
                { field: 'contactNumber', displayName: 'Contact Number' },
                { field: 'email', displayName: 'Email' }
            ]
        }
    ]);
};

// #2 Endpoint to get data for a selected table and fields  
exports.getReportData = async (req, res) => {
    const { table, field, value } = req.body;
    
    let model;
    let query = {};  // Initialize the query object to avoid 'undefined' error

    // Define a field mapping for user-friendly field names
    const fieldMapping = {
        'assetId': 'Asset ID',
        'name': 'Asset Name',
        'qtySupplied': 'Quantity Supplied',
        'qtyTaken': 'Quantity Taken',
        'quantity': 'Total Quantity',
        'supplier': 'Supplier',
        'requestingOfficer': 'Requesting Officer',
        'location': 'Location',
        'assetName': 'Asset Name',
        'selectedContact': 'Collected By',
        'selectedApprovingAuthority': 'Approving Authority',
        'selectedCertifyingAuthority': 'Certifying Authority',
        'supplierId': 'Supplier ID',
        'description': 'Description',
        'contactPerson': 'Collected By',
        'contactNumber': 'Contact Number',
        'email': 'Email'
    };

    // Determine the model and setup query based on the selected table
    if (table === 'Asset Claims') {
        model = Claims;
        if (field && value) {
            query[field] = value;  // Add dynamic filter based on field and value
        }

        try {
            // Fetch claims and populate asset details, including the name
            const data = await model.find(query).populate('assetId', 'assetName');
            // Map the data to make it user-friendly
            const mappedData = data.map(item => {
                const userFriendlyItem = {};
                Object.keys(item.toObject()).forEach(key => {
                    const userFriendlyKey = fieldMapping[key] || key;
                    userFriendlyItem[userFriendlyKey] = item[key];
                });
                return userFriendlyItem;
            });
            return res.json(mappedData); // Return mapped data
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching data', error: err });
        }
    } 
    
    else if (table === 'Assets') {
        model = Assets;
        if (field && value) {
            query[field] = value;  // Add dynamic filter based on field and value
        }
    } 
    
    else if (table === 'Suppliers') {
        model = Suppliers;
        if (field && value) {
            query[field] = value;  // Add dynamic filter based on field and value
        }
    } 
    
    else {
        // If an invalid table is provided
        return res.status(400).json({ message: 'Invalid table selected' });
    }

    try {
        // Fetch the filtered data based on the query
        const data = await model.find(query);
        // Map the data to make it user-friendly
        const mappedData = data.map(item => {
            const userFriendlyItem = {};
            Object.keys(item.toObject()).forEach(key => {
                const userFriendlyKey = fieldMapping[key] || key;
                userFriendlyItem[userFriendlyKey] = item[key];
            });
            return userFriendlyItem;
        });
        return res.json(mappedData);  // Return mapped data
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching data', error: err });
    }
};