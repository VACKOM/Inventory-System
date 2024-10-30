const express = require("express");
const database = require("../../config/connect");
const { ObjectId } = require("mongodb");

let salesPersonRouters = express.Router();

//# 1. Retrieve All Sales People
salesPersonRouters.route("/").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("salesperson").find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});



//# 2. Retrieve One Sales Person
salesPersonRouters.route("/:id").get(async (request, response) => {
    try {
        const salespersonId = request.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(salespersonId)) {
            return response.status(400).json({ message: "Invalid ObjectId format" });
        }

        let db = database.getDb();
        let data = await db.collection("salesperson").findOne({ _id: new ObjectId(salespersonId) });

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
salesPersonRouters.route("/").post(async (request, response) => {

    try {
        let db = database.getDb();
        let mongoObject = {
        
            salespersonid: request.body.salespersonid,
            fname: request.body.fname,
            lname: request.body.lname,
            email: request.body.email,
            number: request.body.number,
            address:request.body.address,
            dob:request.body.dob,
            position:request.body.position,
            notes: request.body.notes,
            date: request.body.date
        };
        let data = await db.collection("salesperson").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 4. Update
salesPersonRouters.route("/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                fname: request.body.fname,
                lname: request.body.lname,
                email: request.body.email,
                number: request.body.number,
                address:request.body.address,
                dob:request.body.dob,
                position:request.body.position,
                notes: request.body.notes,
                date: request.body.date
            }
        };
        let data = await db.collection("salesperson").updateOne({ _id: ObjectId(request.params.id) }, mongoObject);
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
salesPersonRouters.route("/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("salesperson").deleteOne({ _id: ObjectId(request.params.id) });
        if (data.deletedCount > 0) {
            response.json({ message: "Salesperson Deleted Successfully" });
        } else {
            response.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = salesPersonRouters;
