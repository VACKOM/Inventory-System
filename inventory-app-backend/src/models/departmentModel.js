const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    head: { type: String, required: true },
    contact: { type: String, required: true },
    date: { type: Date, required: true },
    

},
{
    timestamps: true,
    collection: 'departments'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Department', departmentSchema);