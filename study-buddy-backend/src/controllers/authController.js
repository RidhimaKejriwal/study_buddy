const bcrypt = require("bcrypt");
const validator = require("validator");

const db = require("../config/db");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Check existing user
        const [existingUsers] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        // Generate token
        const token = generateToken(result.insertId);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: result.insertId,
                name,
                email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Find user
        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const user = users[0];

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = generateToken(user.id);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getMe = async (req, res) => {

    try {

        const userId = req.user.id;

        const [users] = await db.query(
            "SELECT id, name, email, role FROM users WHERE id = ?",
            [userId]
        );

        res.status(200).json(users[0]);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    registerUser, loginUser, getMe
};