const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    assetId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    qtyTaken: { type: Number, required: true, default: 0 }, // Set the default value to 0 },  
    serialNo: { type: String, required: true },
    condition:{ type: String, required: true },
    assetType:{type: String, required: true},
    location: { type: String, required: true },
    requestingOfficer: { type: String, required: true },
    reason: { type: String },
    requestContact: { type: String, required: true },
    supplier: { type: String, required: true },
    category: { type: String, required: true },
    qtySupplied: { type: Number, required: true },
    

},
{
    timestamps: true,
    collection: 'assets'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Asset', assetSchema);