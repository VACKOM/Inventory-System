const mongoose = require('mongoose');

// Schema Definitions for Different Tables
const ClaimsSchema = new mongoose.Schema({
  assetId: String,
  assetName: String,
  requestingOfficer: String,
  qtyTaken: Number,
  selectedContact: String,
  checked: Boolean,
  selectedApprovingAuthority: String,
  selectedCertifyingAuthority: String,
});

const AssetsSchema = new mongoose.Schema({
  assetId: String,
  name: String,
  qtySupplied: Number,
  qtyTaken: Number,
  quantity: Number,
  supplier: String,
  requestingOfficer: String,
  location: String,
});

const SuppliersSchema = new mongoose.Schema({
  supplierId: String,
  name: String,
  description: String,
  location: String,
  contactPerson: String,
  contactNumber: String,
  email: String,
});

// Create Models
const Claims = mongoose.model('Claims', ClaimsSchema);
const Assets = mongoose.model('Assets', AssetsSchema);
const Suppliers = mongoose.model('Suppliers', SuppliersSchema);

// Exporting all models at once
module.exports = {
  Claims,
  Assets,
  Suppliers,
};

