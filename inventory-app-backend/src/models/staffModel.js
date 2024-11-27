const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
    {
        staffId: { type: String, required: true },
        firstName: { type: String, required: true },
        middleName: { type: String }, // Optional field
        lastName: { type: String, required: true },
        contact: { type: String, required: true, unique: true, immutable: true },
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
        department: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: 'staff' // Collection name
    }
);

module.exports = mongoose.model('Staff', staffSchema);
