const express = require("express");
const database = require("../../config/connect");
const { ObjectId } = require("mongodb");

let salesRouters = express.Router();

//# 1. Retrieve All Sales
salesRouters.route("/").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("sales").find({}).toArray();
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
salesRouters.route("/:id").get(async (request, response) => {
    try {
        const saleId = request.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(saleId)) {
            return response.status(400).json({ message: "Invalid ObjectId format" });
        }

        let db = database.getDb();
        let data = await db.collection("sales").findOne({ _id: new ObjectId(saleId) });

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
salesRouters.route("/").post(async (request, response) => {

    try {
        let db = database.getDb();
        let mongoObject = {
            saleid: request.body.saleid,
            productid: request.body.productid,
            productname: request.body.productname,
            quantity: request.body.quantity,
            price: request.body.price,
            total: request.body.total,
            customerid:request.body.customerid,
            paymentmethod:request.body.paymentmethod,
            salespersonid:request.body.salespersonid,
            discount:request.body.discount,
            tax:request.body.tax,
            notes: request.body.notes,
            date: request.body.date
        };
        let data = await db.collection("sales").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 4. Update
salesRouters.route("/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                saleid: request.body.saleid,
                productid: request.body.productid,
                productname: request.body.productname,
                quantity: request.body.quantity,
                price: request.body.price,
                total: request.body.total,
                customerid:request.body.customerid,
                paymentmethod:request.body.paymentmethod,
                salespersonid:request.body.salespersonid,
                discount:request.body.discount,
                tax:request.body.tax,
                notes: request.body.notes,
                date: request.body.date
            }
        };
        let data = await db.collection("sales").updateOne({ _id: ObjectId(request.params.id) }, mongoObject);
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
salesRouters.route("/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("sales").deleteOne({ _id: ObjectId(request.params.id) });
        if (data.deletedCount > 0) {
            response.json({ message: "Sale Deleted Successfully" });
        } else {
            response.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = salesRouters;
