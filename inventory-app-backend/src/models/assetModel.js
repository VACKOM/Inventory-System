const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    assetId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    assetType:{type: String, required: true},
    location: { type: String, required: true },
    requestedBy: { type: String, required: true },
    requestContact: { type: String, required: true },
    supplier: { type: String, required: true },
    date: { type: Date, required: true },
    qrCode:{ type: String }

},
{
    timestamps: true,
    collection: 'assets'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Asset', assetSchema);