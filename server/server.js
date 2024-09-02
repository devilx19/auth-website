const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Serve HTML files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Handle signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const userFilePath = path.join(__dirname, '../user-data', `${username}.json`);

    if (fs.existsSync(userFilePath)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    fs.writeFileSync(userFilePath, JSON.stringify({ username, password }));
    res.json({ message: 'User signed up successfully' });
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userFilePath = path.join(__dirname, '../user-data', `${username}.json`);

    if (!fs.existsSync(userFilePath)) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    const userData = JSON.parse(fs.read
