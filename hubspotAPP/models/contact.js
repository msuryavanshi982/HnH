const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // Define contact schema fields
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
