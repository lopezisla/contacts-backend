module.exports = (app) => {
    const contacts = require('../controllers/contact.controller.js');

    // Create a new Contact
    app.post('/contacts', contacts.create);

    // Retrieve all Contact
    app.get('/contacts', contacts.findAll);

    // Retrieve a single Contact with contactId
    app.get('/contacts/:contactId', contacts.findOne);

    // Retrieve a single Contact with email
    app.get('/email/:email', contacts.findOneByEmail);

    // Retrieve a single Contact with email
    app.get('/phone/:phone', contacts.findOneByPhone);

    // Update a Contact with contactId
    app.put('/contacts/:contactId', contacts.update);

    // Delete a Contact with contactId
    app.delete('/contacts/:contactId', contacts.delete);
}