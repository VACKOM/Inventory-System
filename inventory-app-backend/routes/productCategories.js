const express = require("express");
const database = require("../config/connect");
const { ObjectId } = require("mongodb");

let categoryRouters = express.Router();

//# 1. Retrieve All categories
categoryRouters.route("/category").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("categories").find({}).toArray();
        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});



//# 2. Retrieve One Category
categoryRouters.route("/category/:id").get(async (request, response) => {
    try {
        const categoryId = request.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(productId)) {
            return response.status(400).json({ message: "Invalid ObjectId format" });
        }

        let db = database.getDb();
        let data = await db.collection("categories").findOne({ _id: new ObjectId(categoryId) });

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
categoryRouters.route("/category").post(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            name: request.body.name,
            description: request.body.description,
            date: request.body.date
        };
        let data = await db.collection("categories").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//# 4. Update
categoryRouters.route("/category/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                name: request.body.name,
                description: request.body.description,
                date: request.body.date
            }
        };
        let data = await db.collection("categories").updateOne({ _id: ObjectId(request.params.id) }, mongoObject);
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
categoryRouters.route("/category/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("categories").deleteOne({ _id: ObjectId(request.params.id) });
        if (data.deletedCount > 0) {
            response.json({ message: "Category Deleted Successfully" });
        } else {
            response.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = categoryRouters;


