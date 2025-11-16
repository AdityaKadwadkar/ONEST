const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// -------------------- REGISTER --------------------
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, studentId, email, password } = req.body;

    // validation
    if (!firstName || !lastName || !studentId || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    // check if user exists
    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { studentId }]
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Email or Student ID already exists'
      });
    }

    // create user (password will be hashed by model)
    const newUser = new User({
      firstName,
      lastName,
      studentId,
      email: email.toLowerCase(),
      password
    });

    await newUser.save();

    // Generate JWT token for auto-login after registration
    const token = jwt.sign(
      { userId: newUser._id, studentId: newUser.studentId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: newUser._id,
        studentId: newUser.studentId,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
});


// -------------------- LOGIN --------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // find user
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // compare password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // generate token
    const token = jwt.sign(
      { userId: user._id, studentId: user.studentId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        studentId: user.studentId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});

module.exports = router;
