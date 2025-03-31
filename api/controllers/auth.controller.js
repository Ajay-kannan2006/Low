const bcrypt = require('bcrypt');
const User = require('../models/Register');
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const maxAge = 7 * 24 * 60 * 60;
const generateToken = (id) => {
    return jwt.sign({ id }, 'my-token', {
        expiresIn: maxAge,
        httpOnly: true, // Prevent access from JavaScript (security best practice)
    secure: true, // Only send cookies over HTTPS
    sameSite: 'none',
    })
}


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            projects: [],
            blocks:[],
        });

        const token = generateToken(newUser._id);
        res.cookie('jwt', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: false, // Set to true in production (HTTPS only)
            maxAge: 1000 * 60 * 60 * 24,
        });

        console.log("user registration", newUser);

        return res.status(201).json({
            message: "User registered successfully",
            user: { username: newUser.username, email: newUser.email }
        });

    } catch (err) {
        console.error("Error in register:", err);
        return res.status(500).json({ message: "Failed to create user" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    try {
        //checking if the user name exist or not
        const userdata = await User.findOne({ username });
        console.log(userdata);

        // if user is not occur to send the json message 
        if (!userdata) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        console.log(0);


        // checking if the password is valid or not
        const isPasswordValid = await bcrypt.compare(password, userdata.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
        console.log("1");

        const token = generateToken(userdata._id);
        res.cookie('jwt', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(200).json({ message: "Login successful" });
    }
    catch (err) {
        return res.status(500).json({
            message: "failed to Fetch the data"
        })
    }
};

const checkAlreadyLoggedIn = async (req, res) => {
    const token = req.cookies['jwt'];
    if (!token) {
        return res.status(200).json({ logged: false });
    } else {
        res.status(200).json({ logged: true });
    }
}


module.exports = { login, register, checkAlreadyLoggedIn };