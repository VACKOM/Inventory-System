const express = require("express");
const database = require("../../config/connect");
const { ObjectId } = require("mongodb");

let customerRouters = express.Router();

//# 1. Retrieve All Customers
customerRouters.route("/").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("customers").find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});



//# 2. Retrieve One Customer
customerRouters.route("/:id").get(async (request, response) => {
    try {
        const customerId = request.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(customerId)) {
            return response.status(400).json({ message: "Invalid ObjectId format" });
        }

        let db = database.getDb();
        let data = await db.collection("customers").findOne({ _id: new ObjectId(customerId) });

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
customerRouters.route("/").post(async (request, response) => {

    try {
        let db = database.getDb();
        let mongoObject = {
            customerid: request.body.customerid,
            fname: request.body.fname,
            lname: request.body.lname,
            email: request.body.email,
            number: request.body.number,
            address: request.body.address,
            dob:request.body.dob,
            notes: request.body.notes,
            date: new Date(),
        };
        let data = await db.collection("customers").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 4. Update
customerRouters.route("/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                customerid: request.body.customerid,
                fname: request.body.fname,
                lname: request.body.lname,
                email: request.body.email,
                number: request.body.number,
                address: request.body.address,
                dob:request.body.dob,
                notes: request.body.notes,
               // date: request.body.date
            }
        };
        let data = await db.collection("customers").updateOne({ _id: ObjectId(request.params.id) }, mongoObject);
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
customerRouters.route("/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("customers").deleteOne({ _id: ObjectId(request.params.id) });
        if (data.deletedCount > 0) {
            response.json({ message: "Customer Deleted Successfully" });
        } else {
            response.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = customerRouters;
