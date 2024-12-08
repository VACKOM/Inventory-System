const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    
    assetId: { type: [String], required: true },
    requestingOfficer: { type: String, required: true },
    selectedContact: { type: String, required: true },
    checked: { type: Boolean, required: true },
    selectedApprovingAuthority:{ type: String, required: true },
    selectedCertifyingAuthority:{type: String, required: true},
    

},
{
    timestamps: true,
    collection: 'claims'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Claim', claimSchema);