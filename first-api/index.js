const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// MSSQL Configuration
const dbConfig = {
    user: 'sa', // Replace with your SQL Server username or use Windows Authentication
    password: 'Scrypt0#400p200', // Replace with your SQL Server password

    server: 'localhost',
    database: 'FirstAppDB',
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
};

// Register Endpoint
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const pool = await sql.connect(dbConfig);
        const checkUser = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE Username = @username OR Email = @email');

        if (checkUser.recordset.length > 0) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('passwordHash', sql.NVarChar, passwordHash)
            .query('INSERT INTO Users (Username, Email, PasswordHash) VALUES (@username, @email, @passwordHash)');

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE Username = @username');

        const user = result.recordset[0];
        if (!user || !(await bcrypt.compare(password, user.PasswordHash))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ userId: user.UserID, username: user.Username, email: user.Email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});