const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// @route   POST api/auth/register
// @desc    Register user
router.post(
  '/register',
  [
    check('email', 'Valid email required').isEmail(),
    check('password', '6+ characters required').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      console.log('Signup attempt:', req.body);
      
      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (user) {
        console.log('Duplicate email:', email);
        return res.status(400).json({ msg: 'Email already exists' });
      }

      user = new User({ email, password });
      console.log('New user pre-save:', user);
      
      await user.save();
      console.log('User saved successfully:', user.id);

      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, 
        { expiresIn: '5h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ 
        msg: 'Server error',
        error: err.message 
      });
    }
  }
);

// @route   POST api/auth/login
// @desc    Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;