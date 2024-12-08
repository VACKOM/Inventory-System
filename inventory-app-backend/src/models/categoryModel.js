const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    
    categoryId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    

},
{
    timestamps: true,
    collection: 'categories'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Category', categorySchema);