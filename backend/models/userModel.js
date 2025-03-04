const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String, // Removed `unique: true`
            required: true, // Added required field
        },
        role: {
            type: String,
            required: true,
            enum: ["superAdmin", "admin", "manager", "user"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
