const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: String,
    profileImage: String,
    birthDate: Date,
    personalPhoneNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    workPhoneNumber: Number,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    address: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
