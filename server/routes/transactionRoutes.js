const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");


// GET ALL TRANSACTIONS
router.get("/", async (req, res) => {

  try {

    const transactions = await Transaction.find();

    res.json(transactions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// CREATE TRANSACTION
router.post("/", async (req, res) => {

  try {

    const { title, amount, type, date } = req.body;

    if (!title || !amount || !type || !date) {

      return res.status(400).json({
        message: "All fields required"
      });

    }

    const transaction = new Transaction(req.body);

    await transaction.save();

    res.status(201).json(transaction);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// DELETE TRANSACTION
router.delete("/:id", async (req, res) => {

  try {

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      message: "Transaction Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE TRANSACTION
router.put("/:id", async (req, res) => {

  try {

    const updatedTransaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedTransaction);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;