const Expense = require('../models/expense');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addExpense = async (req, res) => {
    try {
        const { title, amount, date } = req.body;

        const expense = await Expense.create({
            title,
            amount,
            date
        });

        res.status(201).json(expense);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, date } = req.body;

        await Expense.update(
            { title, amount, date },
            { where: { id } }
        );

        res.json({ message: "Expense updated" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        await Expense.destroy({
            where: { id }
        });

        res.json({ message: "Expense deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};