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
      required: true,
    },
    workPhoneNumber: Number,
    email: {
      type: String,
      required: true,
    },
    address: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
