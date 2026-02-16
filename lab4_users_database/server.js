const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8081;
const MONGO_URI = "mongodb+srv://comp3133:comp3133@comp3133lab4.bct4d8f.mongodb.net/?appName=comp3133lab4";

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Simple health check
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Lab 04 Users API running" });
});

app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        const saved = await user.save();
        res.status(201).json(saved);
    } catch (err) {
        // If it's a mongoose validation error, build nicer output for Postman screenshots
        if (err.name === "ValidationError") {
            const errors = {};
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.status(400).json({
                message: "Validation Failed",
                errors
            });
        }

        // Duplicate key (unique email)
        if (err.code === 11000) {
            return res.status(400).json({
                message: "Validation Failed",
                errors: {
                    email: "email must be unique"
                }
            });
        }

        // Other errors
        return res.status(400).json({
            message: "Request Failed",
            error: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
