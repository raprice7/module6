const express = require('express');
const router = express.Router();
const BankAccount = require('./models/model');

// CREATE
router.post('/', async (req, res) => {
  try {
    const newBankAccount = await BankAccount.create(req.body);
    res.status(201).json(newBankAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find();
    res.json(bankAccounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getBankAccount, (req, res) => {
  res.json(res.bankAccount);
});

// UPDATE
router.patch('/:id', getBankAccount, async (req, res) => {
  if (req.body.accountNumber != null) {
    res.bankAccount.accountNumber = req.body.accountNumber;
  }
  if (req.body.accountType != null) {
    res.bankAccount.accountType = req.body.accountType;
  }
  if (req.body.balance != null) {
    res.bankAccount.balance = req.body.balance;
  }
  if (req.body.ownerEmail != null) {
    res.bankAccount.ownerEmail = req.body.ownerEmail;
  }
  try {
    const updatedBankAccount = await res.bankAccount.save();
    res.json(updatedBankAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', getBankAccount, async (req, res) => {
  try {
    await res.bankAccount.remove();
    res.json({ message: 'Bank account deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MIDDLEWARE
async function getBankAccount(req, res, next) {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);
    if (bankAccount == null) {
      return res.status(404).json({ message: 'Cannot find bank account' });
    }
    res.bankAccount = bankAccount;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
