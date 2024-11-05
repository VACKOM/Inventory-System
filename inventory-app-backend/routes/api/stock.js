const express = require("express");
const database = require("../../config/connect");

let stockRouters = express.Router();

//# 1. Retrieve All stock
stockRouters.route("/").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("stock").find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 2. Retrieve One stock by SKU
stockRouters.route("/sku/:sku").get(async (request, response) => {
    try {
        const sku = request.params.sku;

        let db = database.getDb();
        let data = await db.collection("stock").findOne({ sku: sku });

        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: error.message });
    }
});

//# 3. Create
stockRouters.route("/").post(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            sku: request.body.sku,
            quantity: request.body.quantity,
            price: request.body.price,
            lastupdate: new Date(), // Update this to the current time
        };
        let data = await db.collection("stock").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 4. Update
stockRouters.route("/sku/:sku").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                quantity: request.body.quantity,
                price: request.body.price,
                lastupdate: new Date(), // Update this to the current time
            }
        };
        let data = await db.collection("stock").updateOne({ sku: request.params.sku }, mongoObject);
        if (data.modifiedCount > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 5. Delete
stockRouters.route("/sku/:sku").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("stock").deleteOne({ sku: request.params.sku });
        if (data.deletedCount > 0) {
            response.json({ message: "Stock Deleted Successfully" });
        } else {
            response.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = stockRouters;
