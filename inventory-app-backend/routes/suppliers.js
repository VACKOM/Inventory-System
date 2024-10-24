const express = require("express");
const database = require("../config/connect");
const { ObjectId } = require("mongodb");

let supplierRouters = express.Router();

//# 1. Retrieve All Products
supplierRouters.route("/supplier").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("suppliers").find({}).toArray();
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
supplierRouters.route("/supplier/:id").get(async (request, response) => {
    try {
        const supplierId = request.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(productId)) {
            return response.status(400).json({ message: "Invalid ObjectId format" });
        }

        let db = database.getDb();
        let data = await db.collection("suppliers").findOne({ _id: new ObjectId(supplierId) });

        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        response.status(500).json({ message: error.message });
    }
});

//# 3. Create
supplierRouters.route("/supplier").post(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            name: request.body.name,
            contactPerson: request.body.contactPerson,
            contactNumber: request.body.contactNumber,
            email: request.body.email,
            productSupplied: request.body.productSupplied,
            date: request.body.date
        };
        let data = await db.collection("suppliers").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 4. Update
supplierRouters.route("/supplier/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                name: request.body.name,
                contactPerson: request.body.contactPerson,
                contactNumber: request.body.contactNumber,
                email: request.body.email,
                productSupplied: request.body.productSupplied,
                date: request.body.date
            }
        };
        let data = await db.collection("suppliers").updateOne({ _id: ObjectId(request.params.id) }, mongoObject);
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
supplierRouters.route("/supplier/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("suppliers").deleteOne({ _id: ObjectId(request.params.id) });
        if (data.deletedCount > 0) {
            response.json({ message: "Supplier Deleted Successfully" });
        } else {
            response.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = supplierRouters;
