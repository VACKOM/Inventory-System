const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
    {
        supplierId: { type: String, required: true, unique: true }, // Unique supplier ID
        name: { type: String, required: true },
        description: { type: String }, // Optional field
        location: { type: String, required: true },
        contactPerson: { type: String, required: true },
        contactNumber: { 
            type: String, 
            required: true,
            validate: {
                validator: function (v) {
                    return /^\d{10,15}$/.test(v); // Validates 10-15 digit numbers
                },
                message: props => `${props.value} is not a valid contact number!`
            }
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            immutable: true,
            validate: {
                validator: function (v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Email format validation
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        date: { type: Date, default: Date.now } // Auto-set creation date
    },
    {
        timestamps: true,
        collection: 'suppliers'
    }
);

module.exports = mongoose.model('Supplier', supplierSchema);
