const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    assetId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: String, required: true },
    serialNo: { type: String, required: true },
    condition:{ type: String, required: true },
    assetType:{type: String, required: true},
    location: { type: String, required: true },
    requestingOfficer: { type: String, required: true },
    reason: { type: String },
    requestContact: { type: String, required: true },
    supplier: { type: String, required: true },
    category: { type: String, required: true }
    

},
{
    timestamps: true,
    collection: 'assets'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Asset', assetSchema);