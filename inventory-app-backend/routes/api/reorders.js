const express = require("express");
const database = require("../../config/connect");
const { ObjectId } = require("mongodb");

let reorderRouters = express.Router();

//# 1. Retrieve All Reorders
reorderRouters.route("/").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("reorders").find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});



//# 2. Retrieve One Sale
reorderRouters.route("/:id").get(async (request, response) => {
    try {
        const reorderId = request.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(reorderId)) {
            return response.status(400).json({ message: "Invalid ObjectId format" });
        }

        let db = database.getDb();
        let data = await db.collection("reorders").findOne({ _id: new ObjectId(reorderId) });

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
reorderRouters.route("/").post(async (request, response) => {

    try {
        let db = database.getDb();
        let mongoObject = {
        
            productid: request.body.productid,
            productname: request.body.productname,
            quantity: request.body.quantity,
            price: request.body.price,
            total: request.body.total,
            supplierid:request.body.supplierid,
            batchno:request.body.batchno,
            expiringdate:request.body.expiringdate,
            notes: request.body.notes,
            date: request.body.date
        };
        let data = await db.collection("reorders").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 4. Update
reorderRouters.route("/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                productid: request.body.productid,
                productname: request.body.productname,
                quantity: request.body.quantity,
                price: request.body.price,
                total: request.body.total,
                supplierid:request.body.supplierid,
                batchno:request.body.batchno,
                expiringdate:request.body.expiringdate,
                notes: request.body.notes,
                date: request.body.date
            }
        };
        let data = await db.collection("reorders").updateOne({ _id: ObjectId(request.params.id) }, mongoObject);
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
reorderRouters.route("/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("reorders").deleteOne({ _id: ObjectId(request.params.id) });
        if (data.deletedCount > 0) {
            response.json({ message: "Reorder Deleted Successfully" });
        } else {
            response.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = reorderRouters;
