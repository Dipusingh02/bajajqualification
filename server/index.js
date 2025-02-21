const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid data format' });
    }

    const user_id = process.env.USER_ID;
    const email = process.env.EMAIL;
    const roll_number = process.env.ROLL_NUMBER;

    let numbers = [];
    let alphabets = [];
    let highest_alphabet = [];

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(Number(item));
        } else if (typeof item === 'string') {
            alphabets.push(item.trim());
        }
    });

    if (alphabets.length > 0) {
        highest_alphabet = [alphabets.reduce((a, b) => a.localeCompare(b) > 0 ? a : b)];
    }

    res.json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highest_alphabet
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
