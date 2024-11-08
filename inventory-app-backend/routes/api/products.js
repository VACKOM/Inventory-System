const express = require("express");
const database = require("../../config/connect");
const { ObjectId } = require("mongodb");

let productRouters = express.Router();

//# 1. Retrieve All Products
productRouters.route("/").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("products").find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 2. Retrieve One Product
productRouters.route("/:id").get(async (request, response) => {
    try {
        const productId = request.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(productId)) {
            return response.status(400).json({ message: "Invalid ObjectId format" });
        }

        let db = database.getDb();
        let data = await db.collection("products").findOne({ _id: new ObjectId(productId) });

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
productRouters.route("/").post(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            name: request.body.name,
            sku: request.body.sku,
            description: request.body.description,
            category: request.body.category,
            supplier: request.body.supplier,
            date: new Date(),
        };
        let data = await db.collection("products").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 4. Update
productRouters.route("/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                name: request.body.name,
                sku: request.body.sku,
                description: request.body.description,
                category: request.body.category,
                supplier: request.body.supplier,
               // date: request.body.date
            }
        };
        let data = await db.collection("products").updateOne({ _id: ObjectId(request.params.id) }, mongoObject);
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
productRouters.route("/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("products").deleteOne({ _id: ObjectId(request.params.id) });
        if (data.deletedCount > 0) {
            response.json({ message: "Product Deleted Successfully" });
        } else {
            response.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = productRouters;