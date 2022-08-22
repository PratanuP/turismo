const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    middleName: { type: String, trim: true, required: false },
    lastName: { type: String, trim: true, required: true },
    photoId: { type: String, trim: true, required: true },
    photoIdNo: { type: String, trim: true, required: true },
    gender: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    phoneNumberCode: { type: String, trim: true, required: true, unique: true },
    phoneNumber: { type: Number, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: "User",
  }
);

module.exports = mongoose.model("User", userSchema);
