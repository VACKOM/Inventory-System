const express = require("express");
const database = require("../../config/connect");

const stockRouter = express.Router();

// GET /api/stock/sku/:sku
stockRouter.get("/sku/:sku", async (req, res) => {
    const { sku } = req.params;

    try {
        let db = database.getDb();

        // Fetch stock item
        const stockItem = await db.collection("stock").findOne({ sku });
        if (!stockItem) {
            return res.status(404).json({ message: "Stock item not found" });
        }

        // Fetch product item (assuming there's a relation based on SKU)
        const productItem = await db.collection("products").findOne({ sku });
        if (!productItem) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Combine the relevant data
        const result = {
            sku: stockItem.sku,
            price: stockItem.price,
            productname: productItem.name,
            quantity: stockItem.quantity
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Update Stock Quantity
stockRouter.route("/sku/:sku").put(async (request, response) => {
    try {
        const sku = request.params.sku;
        const { stock } = request.body; // New stock quantity from request body

        let db = database.getDb();
        let data = await db.collection("stock").updateOne(
            { sku: sku }, 
            { $set: { stock: stock } }
        );

        if (data.modifiedCount > 0) {
            response.json({ message: "Stock updated successfully." });
        } else {
            response.status(404).json({ message: "No Stock Record Found to Update." });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = stockRouter;
