const mongoose = require('mongoose');

// Define Mongoose Schema for sub-documents
const IntlPhoneNumberSchema = require('mongoos-intl-phone-number');
const accountOwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone:{
    type: IntlPhoneNumberSchema,
    required: true,
  }
});
// Define Mongoose Schema for bank account data
const bankAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
    min: 1000000000, // must be at least 10 digits long
    max: 9999999999, // must be no more than 10 digits long
  },
  accountType: {
    type: String,
    required: true,
    enum: ['checking', 'savings'], // account type must be either 'checking' or 'savings'
  },
  balance: {
    type: Number,
    required: true,
    min: 0, // balance cannot be negative
  },
  ownerEmail: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation regex
        return emailRegex.test(email);
      },
      message: 'Please enter a valid email address',
    },
  },
  owner: [accountOwnerSchema],
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
