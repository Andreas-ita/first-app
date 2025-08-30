const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;
const JWT_SECRET = 'StrongPassword123!'; //for production to be stored in a .env file using dotenv

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// MSSQL Configuration
const dbConfig = {
    user: 'adm',
    password: 'StrongPassword123!',
    server: 'localhost',
    database: 'FirstAppDB',

    options: {
        encrypt: false, // Set to false for local Windows Authentication
        trustServerCertificate: true, // Set to true for local development
        //trustedConnection: true // Ensures Windows Authentication
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

// Login Endpoint with JWT
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

        // Generate JWT
        const token = jwt.sign(
            { userId: user.UserID, username: user.Username, email: user.Email },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({ userId: user.UserID, username: user.Username, email: user.Email, token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Protected betting endpoint
app.get('/api/bets', verifyToken, (req, res) => {
    res.status(200).json({ message: `Welcome ${req.user.username}, here are your bets` });
});

//testing db conn can remove later
app.get('/test-db', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        res.status(200).json({ message: 'Database connection successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});