const Contact = require("../models/contact.model.js");

// Create and Save a new Contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Contact name can not be empty",
    });
  }
  if (!req.body.personalPhoneNumber) {
    return res.status(400).send({
      message: "Contact personal phone number can not be empty",
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: "Contact email can not be empty",
    });
  }
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const resultEmailValidation = emailValid.test(req.body.email);
  if (!resultEmailValidation) {
    return res.status(400).send({
      message: "Contact email format incorrect",
    });
  }
  // Create a Contact
  const contact = new Contact({
    name: req.body.name,
    company: req.body.company,
    profileImage: req.body.profileImage,
    birthDate: req.body.birthDate,
    personalPhoneNumber: req.body.personalPhoneNumber,
    workPhoneNumber: req.body.workPhoneNumber,
    email: req.body.email,
    address: req.body.address,
  });

  // Save Contact in the database
  contact
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the contact.",
      });
    });
};

// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.send(contacts);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts.",
      });
    });
};

// Find a single contact with a contactId
exports.findOne = (req, res) => {
  Contact.findById(req.params.contactId)
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      res.send(contact);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving contact with id " + req.params.contactId,
      });
    });
};

// Find a single contact with a email
exports.findOneByEmail = (req, res) => {
    Contact.find({email: req.params.email})
      .then((contact) => {
        if (!contact) {
          return res.status(404).send({
            message: "Contact not found with email " + req.params.email,
          });
        }
        res.send(contact);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Contact not found with email " + req.params.email,
          });
        }
        return res.status(500).send({
          message: "Error retrieving contact with email " + req.params.email,
        });
      });
  };

  // Find a single contact with a phone numbre
exports.findOneByPhone = (req, res) => {
    Contact.find({personalPhoneNumber: req.params.personalPhoneNumber})
      .then((contact) => {
        if (!contact) {
          return res.status(404).send({
            message: "Contact not found with phone numbre " + req.params.personalPhoneNumber,
          });
        }
        res.send(contact);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Contact not found with phone numbre " + req.params.personalPhoneNumber,
          });
        }
        return res.status(500).send({
          message: "Error retrieving contact with phone numbre " + req.params.personalPhoneNumber,
        });
      });
  };

// Update a contact identified by the contactId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Contact name can not be empty",
    });
  }
  if (!req.body.personalPhoneNumber) {
    return res.status(400).send({
      message: "Contact personal phone number can not be empty",
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: "Contact email can not be empty",
    });
  }
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const resultEmailValidation = emailValid.test(req.body.email);
  if (!resultEmailValidation) {
    return res.status(400).send({
      message: "Contact email format incorrect",
    });
  }
  // Find contact and update it with the request body
  Contact.findByIdAndUpdate(
    req.params.contactId,
    {
      name: req.body.name,
      company: req.body.company,
      profileImage: req.body.profileImage,
      birthDate: req.body.birthDate,
      personalPhoneNumber: req.body.personalPhoneNumber,
      workPhoneNumber: req.body.workPhoneNumber,
      email: req.body.email,
      address: req.body.address,
    },
    { new: true }
  )
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      res.send(contact);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Error updating contact with id " + req.params.contactId,
      });
    });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
  Contact.findByIdAndRemove(req.params.contactId)
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      res.send({ message: "Contact deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Could not delete contact with id " + req.params.contactId,
      });
    });
};
