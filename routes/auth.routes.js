const { Router } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      passwordHash,
    });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      res.status(400).json({ msg: error.message });
    }
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
